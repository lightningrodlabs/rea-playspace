import {runScenario, Scenario, pause, getZomeCaller, Player } from "@holochain/tryorama";
import { info } from "console";
import { reaPlayspaceDnaPath } from './utils';
import test from 'tape';

async function setup(scenario: Scenario) {
  const alice = await scenario.addPlayerWithApp({ path: reaPlayspaceDnaPath});
  return getZomeCaller(alice.cells[0], "projects");
}

test("01 - IF commitment created WHEN get_thing called THEN assert put success", async (t) => {
  await runScenario(async (scenario: Scenario) => {

    const projectZomeCall = await setup(scenario);

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
    await projectZomeCall(
      "put_thing",
      {
        path: "plans.p1", 
        data: JSON.stringify(plan)
      }
    );

    await pause(500);

    // Alice adds a commitment
    let put_output: any = await projectZomeCall(
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );

    await pause(500);

    t.ok(put_output.header_hash);
    t.ok(put_output.entry_hash);
  });
});

test("02- IF nothing created WHEN get_thing called THEN assert looseEqual undefined", async (t) => {
  await runScenario(async (scenario: Scenario) => {

    const projectZomeCall = await setup(scenario);

    // Get thing that doesn't not exist
    let get_output: any = await projectZomeCall(
      "get_thing",
      "doesntexist"
    );
    info('02 - get_output: ', get_output);
    t.looseEqual(get_output.tree[0], undefined);
  });
});

test("03 - IF commitment created when GET_THING called THEN assert deepEquals", async (t) => {
  await runScenario(async (scenario: Scenario) => {

    const projectZomeCall = await setup(scenario);

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
    await projectZomeCall(
      "put_thing",
      {
        path: "plans.p1", 
        data: JSON.stringify(plan)
      }
    );

    await pause(500);

    // Alice adds a commitment
    await projectZomeCall(
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );

    await pause(500);

    let get_output: any = await projectZomeCall(
        "get_thing",
        "plans"
    );

    info('03 - get_output: ', get_output);
    t.ok(get_output);

    let jsTree = buildTree(get_output.tree, get_output.tree[0])
    info('03 - get_output - jsTree Plans: ', JSON.stringify(jsTree, null, 2));

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
  });
});

test("04 - IF commitment created with update WHEN get_thing called THEN assert deepEquals", async (t) => {
  await runScenario(async (scenario: Scenario) => {

    const projectZomeCall = await setup(scenario);

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
    await projectZomeCall(
      "put_thing",
      {
        path: "plans.p1", 
        data: JSON.stringify(plan)
      }
    );

    await pause(500);

    // Alice adds a commitment
    await projectZomeCall(
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );

    await pause(500);

    await projectZomeCall(
        "get_thing",
        "plans"
    );

    commitment.effortQuantity.hasNumericalValue = 15
    // Alice updates a commitment
    await projectZomeCall(
      "put_thing",
      {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );

    let get_output: any = await projectZomeCall(
      "get_thing",
      "plans"
    );

    t.ok(get_output)

    let jsTree = buildTree(get_output.tree, get_output.tree[0])
    info('04 - get_output - jsTree Plans: ', JSON.stringify(jsTree, null, 2));

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
                            data: '{"inputOf":"pr1","id":"cm1","effortQuantity":{"hasNumericalValue":15,"hasUnit":"minute"}}'
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
  });
});

test("05 - IF commitment created and then deleted WHEN get_thing called THEN assert deepEquals", async (t) => {
  await runScenario(async (scenario: Scenario) => {

    const projectZomeCall = await setup(scenario);

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
    await projectZomeCall(
      "put_thing",
      {
        path: "plans.p1", 
        data: JSON.stringify(plan)
      }
    );

    await pause(500);

    // Alice adds a commitment
    await projectZomeCall(
        "put_thing",
        {path: "plans.p1.processes.pr1.commitments.cm1", data: JSON.stringify(commitment)}
    );

    await pause(500);

    // delete thing + links
    await projectZomeCall(
      "delete_thing",
      "plans.p1.processes.pr1.commitments.cm1"
    );

    let get_output: any = await projectZomeCall(
      "get_thing",
      "plans"
    );

    info('05 - get_output: ', get_output);
    t.ok(get_output);

    let jsTree = buildTree(get_output.tree, get_output.tree[0])
    info('05 - get_output - jsTree Plans: ', JSON.stringify(jsTree, null, 2));

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