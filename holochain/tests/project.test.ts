import { assert, test } from "vitest";

import { AppBundleSource } from "@holochain/client";
import { CallableCell, dhtSync, PlayerApp, runScenario } from "@holochain/tryorama";

// Construct proper paths for your app.
// This assumes app bundle created by the `hc app pack` command.
const testAppPath = process.cwd() + "/../workdir/rea_playspace.happ";

// Set up the app to be installed
const appBundleSource: AppBundleSource = { type: "path", value: testAppPath };
const appSource = { appBundleSource };

// Define test objects
const hi = {
  greetings: "Hello!"
}
const hola = {
  greetings: "¡Hola!"
}

// Declare player apps to be used for tests
let alice: PlayerApp;
let beto: PlayerApp;

// Declare cells used in each test
let aliceCell: CallableCell;
let betoCell: CallableCell;

await runScenario(async scenario => {

  test("set up two agents", async () => {
    // Add 2 players with the test app to the Scenario. The returned players
    // can be destructured.
    [alice, beto] = await scenario.addPlayersWithApps([appSource, appSource]);

    // Shortcut peer discovery through gossip and register all agents in every
    // conductor of the scenario.
    await scenario.shareAllAgents();
    aliceCell = alice.cells[0];
    betoCell = beto.cells[0];
  })
  
  test("create two things and make sure they propagate", async () => {

    // Alice sends a hello
    const resultAlice = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "put_thing",
      payload: {path: "stuff.hi", data: JSON.stringify(hi)},
    });
    assert.ok(resultAlice);

    // Beto sends a hello
    const resultBeto = await betoCell.callZome({
      zome_name: "projects",
      fn_name: "put_thing",
      payload: {path: "stuff.hola", data: JSON.stringify(hola)},
    });
    assert.ok(resultBeto);

    await dhtSync([alice, beto], alice.cells[0].cell_id[0]);

    // Alice gets all hellos
    const hellosAlice: Array<any> = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "get_all_things",
      payload: undefined,
    });

    // confirm that both hellos are present
    assert.equal(hellosAlice.length, 2);
    assert.equal(hellosAlice[0].thing.data, JSON.stringify(hi));
    assert.deepEqual(hellosAlice[0].author, aliceCell.cell_id[1]);
    assert.equal(hellosAlice[1].thing.data, JSON.stringify(hola));
    assert.deepEqual(hellosAlice[1].author, betoCell.cell_id[1]);
  })

  test("get_latest_thing retrieves only the latest put thing and nothing after delete", async () => {
    const betoHola: any = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "get_latest_thing",
      payload: "stuff.hola",
    });

    assert.equal(betoHola.thing?.data, JSON.stringify(hola));

    const didDelete = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "delete_thing_by_path",
      payload: "stuff.hola",
    });
    assert.ok(didDelete)

    await dhtSync([alice, beto], alice.cells[0].cell_id[0]);

    const betoHolaAfterDelete: any = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "get_latest_thing",
      payload: "stuff.hola",
    });
    assert.isNull(betoHolaAfterDelete)
  
    const resultBetoTheSecond: any = await betoCell.callZome({
      zome_name: "projects",
      fn_name: "put_thing",
      payload: {path: "stuff.hola", data: JSON.stringify(hola)},
    });
    assert.ok(resultBetoTheSecond);

    await dhtSync([alice, beto], alice.cells[0].cell_id[0]);

    const betoHolaTheSecond: any = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "get_latest_thing",
      payload: "stuff.hola",
    });

    assert.equal(resultBetoTheSecond.thing.data, JSON.stringify(hola));
    assert.equal(betoHolaTheSecond.thing.data, JSON.stringify(hola));
  })

  test("create children to a path", async () => {
    const betoHola: any = await aliceCell.callZome({
      zome_name: "projects",
      fn_name: "get_latest_thing",
      payload: "stuff",
    });
    console.log(betoHola);
  })

});
