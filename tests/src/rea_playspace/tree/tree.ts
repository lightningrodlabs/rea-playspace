import { Orchestrator, Player, Cell } from "@holochain/tryorama";
import { config, installation, sleep } from '../../utils';

function parseThings(val: String) {
    return val
}
export default (orchestrator: Orchestrator<any>) =>  {
  
  orchestrator.registerScenario("tree tests", async (s, t) => {
    // Declare two players using the previously specified config, nicknaming them "alice" and "bob"
    // note that the first argument to players is just an array conductor configs that that will
    // be used to spin up the conductor processes which are returned in a matching array.
    const [alice_player, bob_player]: Player[] = await s.players([config, config]);

    // install your happs into the conductors and destructuring the returned happ data using the same
    // array structure as you created in your installation array.
    const [[alice_happ]] = await alice_player.installAgentsHapps(installation);
    const [[bob_happ]] = await bob_player.installAgentsHapps(installation);

    await s.shareAllNodes([alice_player, bob_player]);

    const alice = alice_happ.cells.find(cell => cell.cellRole.includes('/application.dna')) as Cell;
    const bob = bob_happ.cells.find(cell => cell.cellRole.includes('/application.dna')) as Cell;

    let commitment = {
        // vf:Commitment
        'inputOf': 'pr1',
        'id': 'cm1',
        'effortQuantity': {
            // om:Measure
            'hasNumericalValue': 12,
            'hasUnit': 'minute'
        }
    }

    let plan = {
      'id': 'p1',
      'name': 'Default Plan'
    }

    // Alice adds a plan
    await alice.call(
      "projects",
      "put_thing",
      {path: "plans.p1", data: JSON.stringify(plan)}
    );

    // Alice adds a commitment
    let put_output = await alice.call(
        "projects",
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );
    t.ok(put_output.header_hash);
    t.ok(put_output.entry_hash);

    let get_output = await alice.call(
      "projects",
      "get_thing",
      "doesntexist"
    );
    t.equal(get_output.tree[0], undefined);

    get_output = await alice.call(
        "projects",
        "get_thing",
        "plans"
    );
    console.log('######## GET_OUTPUT #######');
    t.ok(get_output)
    let jsTree = buildTree(get_output.tree,get_output.tree[0])

    console.log('######## DEEP EQUAL #######');
    t.deepEqual(jsTree, {
      val: {
        name: "plans",
        data: "",
      },
      children: [
        {
          val: {
            name: "p1",
            data: '{"id":"p1","name":"Default Plan"}',
          },
          children: [
            {
              val: {
                name: "processes",
                data: "",
              },
              children: [
                {
                  val: {
                    name: "pr1",
                    data: "",
                  },
                  children: [
                    {
                      val: {
                        name: "commitments",
                        data: "",
                      },
                      children: [
                        {
                          val: {
                            name: "cm1",
                            data: '{"inputOf":"pr1","id":"cm1","effortQuantity":{"hasNumericalValue":12,"hasUnit":"minute"}}'
                          },
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    commitment.effortQuantity.hasNumericalValue = 15
    // Alice updates a commitment
    put_output = await alice.call(
        "projects",
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );
    get_output = await alice.call(
        "projects",
        "get_thing",
        "plans"
    );
    console.log('######## OUTPUT AFTER UPDATE #######');
    t.ok(get_output)
    jsTree = buildTree(get_output.tree,get_output.tree[0])
    console.log('######## EQUAL AFTER UPDATE#######');

    t.equal(JSON.parse(jsTree.children[0].children[0].children[0].children[0].children[0].val.data).effortQuantity.hasNumericalValue, 15 )

    // delete thing + links
    await alice.call(
      "projects",
      "delete_thing",
      "plans.p1.processes.pr1.commitments.cm1"
    );

    get_output = await alice.call(
      "projects",
      "get_thing",
      "plans"
    );
    console.log('########   DEEP EQUAL AFTER DELETE #######');

    jsTree = buildTree(get_output.tree,get_output.tree[0]);
    console.log(JSON.stringify(jsTree, null, 2));
    t.deepEqual(jsTree, {
      val: {
        name: "plans",
        data: "",
      },
      children: [
        {
          val: {
            name: "p1",
            data: '{"id":"p1","name":"Default Plan"}',
          },
          children: [],
        },
      ],
    });
  });

}

type RustNode = {
  idx: number;
  val: any;
  parent: null | number;
  children: Array<number>;
};
type Node = {
  val: any;
  children: Array<Node>;
};

function buildTree(tree: Array<RustNode>, node: RustNode): Node {
  let t: Node = { val: node.val, children: [] };
  for (const n of node.children) {
    t.children.push(buildTree(tree, tree[n]));
  }
  return t;
}