
import { Orchestrator, Player, Cell } from "@holochain/tryorama";
import { config, installation, sleep } from '../../utils';

export default (orchestrator: Orchestrator<any>) =>  {
  
  orchestrator.registerScenario("project CRUD tests", async (s, t) => {
    // Declare two players using the previously specified config, nicknaming them "alice" and "bob"
    // note that the first argument to players is just an array conductor configs that that will
    // be used to spin up the conductor processes which are returned in a matching array.
    const [alice_player, bob_player]: Player[] = await s.players([config, config]);

    // install your happs into the conductors and destructuring the returned happ data using the same
    // array structure as you created in your installation array.
    const [[alice_happ]] = await alice_player.installAgentsHapps(installation);
    const [[bob_happ]] = await bob_player.installAgentsHapps(installation);

    await s.shareAllNodes([alice_player, bob_player]);

    const alice = alice_happ.cells.find(cell => cell.cellRole.includes('/rea_playspace.dna')) as Cell;
    const bob = bob_happ.cells.find(cell => cell.cellRole.includes('/rea_playspace.dna')) as Cell;

    const entryContents = {"id":"","name":""};

    // Alice creates a project
    let create_output = await alice.call(
        "projects",
        "create_project",
        entryContents
    );
    t.ok(create_output.header_hash);
    t.ok(create_output.entry_hash);

    await sleep(50);
    
    // Bob gets the created project
    let entry = await bob.call("projects", "get_project", create_output.entry_hash);
    t.deepEqual(entry, entryContents);
    
    
    // Alice updates the project
    let update_output = await alice.call(
      "projects",
      "update_project",
      {
        original_header_hash: create_output.header_hash,
        updated_project: {
          "id": "deserunt pariatur commodo fugiat",
  "name": "irure eu"
}
      }
    );
    t.ok(update_output.header_hash);
    t.ok(update_output.entry_hash);
    await sleep(50);

      
    
    // Alice delete the project
    await alice.call(
      "projects",
      "delete_project",
      create_output.header_hash
    );
    await sleep(50);

    
    // Bob tries to get the deleted project, but he doesn't get it because it has been deleted
    let deletedEntry = await bob.call("projects", "get_project", create_output.entry_hash);
    t.notOk(deletedEntry);
      
  });

}

