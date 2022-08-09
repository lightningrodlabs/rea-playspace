import {runScenario, Scenario, pause, getZomeCaller } from "@holochain/tryorama";
import { info } from "console";
import { reaPlayspaceDnaPath } from './utils';
import test from 'tape';

test("Put Thing: Plan and Commitment", async (t) => {
  await runScenario(async (scenario: Scenario) => {

    const alice = await scenario.addPlayerWithHapp([
      { path: reaPlayspaceDnaPath},
    ]);

    const projectZomeCall = getZomeCaller(alice.cells[0], "projects");

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
    await alice.cells[0].callZome({
      zome_name: "projects",
      fn_name: "put_thing",
      payload: {path: "plans.p1", data: JSON.stringify(plan)}
    });
    await pause(100);

    // Alice adds a commitment
    let put_output: any = await projectZomeCall(
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );

    await pause(500);

    info("Has Header Hash");
    t.ok(put_output.header_hash);
    info("Has Entry Hash");
    t.ok(put_output.entry_hash);

    let get_output: any = await projectZomeCall(
      "get_thing",
      "doesntexist"
    );

    info('get_output: ', get_output);
    t.looseEqual(get_output.tree[0], undefined);

    info('######## GET_OUTPUT: PLANS #######');

    let get_output2: any = await projectZomeCall(
        "get_thing",
        "plans"
    );
    
    info('get_output2: ', get_output2);

    t.ok(get_output2);

    info('get_output: ', get_output);

    t.ok(get_output)

    let jsTree = buildTree(get_output2.tree, get_output2.tree[0])
    info('jsTree: ', jsTree);

    info('######## DEEP EQUAL #######');
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
    put_output = await alice.cells[0].callZome({
        zome_name: "projects",
        fn_name: "put_thing",
        payload: {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    });
    get_output = await alice.cells[0].callZome({
        zome_name: "projects",
        fn_name: "get_thing",
        payload: "plans"
    });
    info('######## OUTPUT AFTER UPDATE #######');
    t.ok(get_output)
    jsTree = buildTree(get_output.tree,get_output.tree[0])
    info('######## EQUAL AFTER UPDATE#######');

    t.equal(JSON.parse(jsTree.children[0].children[0].children[0].children[0].children[0].val.data).effortQuantity.hasNumericalValue, 15 )

    // delete thing + links
    await alice.cells[0].callZome({
      zome_name: "projects",
      fn_name: "delete_thing",
      payload: "plans.p1.processes.pr1.commitments.cm1"
    });

    get_output = await alice.cells[0].callZome({
      zome_name: "projects",
      fn_name: "get_thing",
      payload: "plans"
    });
    info('########   DEEP EQUAL AFTER DELETE #######');

    jsTree = buildTree(get_output.tree,get_output.tree[0]);
    info(JSON.stringify(jsTree, null, 2));
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
});

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

const nullNode: Node = {val: null, children: []};

function buildTree(tree: Array<RustNode>, node: RustNode | undefined): Node {
  if (node == undefined) {
    return nullNode;
  }
  let t: Node = { val: node?.val, children: [] };
  for (const n of node.children) {
    t.children.push(buildTree(tree, tree[n]));
  }
  return t;
}