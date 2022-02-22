import { Config, InstallAgentsHapps, Orchestrator } from "@holochain/tryorama";
import Base64 from "js-base64";
import path from "path";

const conductorConfig = Config.gen();

// Construct proper paths for your DNAs
const hreaModelerDna = path.join(__dirname, "../../workdir/dna/hrea-modeler-test.dna");

// create an InstallAgentsHapps array with your DNAs to tell tryorama what
// to install into the conductor.
const installation: InstallAgentsHapps = [
  // agent 0
  [
    // happ 0
    [hreaModelerDna],
  ],
  [
    // happ 0
    [hreaModelerDna],
  ],
];

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

function serializeHash(hash) {
  return `u${Base64.fromUint8Array(hash, true)}`;
}

const zomeName = 'hrea_modeler';

let orchestrator = new Orchestrator();

orchestrator.registerScenario("create a hreaModeler and get it", async (s, t) => {
  const [alice, bob] = await s.players([conductorConfig]);

  // install your happs into the coductors and destructuring the returned happ data using the same
  // array structure as you created in your installation array.
  const [[alice_hrea_modelers], [bob_hrea_modelers]] = await alice.installAgentsHapps(
    installation
  );


  let alicePubkeyB64 = serializeHash(alice_hrea_modelers.agent);
  let bobPubKeyB64 = serializeHash(bob_hrea_modelers.agent);

  let myHreaModeler = await alice_hrea_modelers.cells[0].call(
    zomeName,
    "get_my_hrea_modeler",
    null
  );
  t.notOk(myHreaModeler);

  let hreaModelerHash = await alice_hrea_modelers.cells[0].call(
    zomeName,
    "create_hrea_modeler",
    {
      nickname: "alice",
      fields: {
        avatar: "aliceavatar",
      },
    }
  );
  t.ok(hreaModelerHash);

  await sleep(500);

  // set nickname as alice to make sure bob's is not getting deleted
  // with alice's update
  hreaModelerHash = await bob_hrea_modelers.cells[0].call(zomeName, "create_hrea_modeler", {
    nickname: "alice_bob",
    fields: {
      avatar: "bobboavatar",
    },
  });
  t.ok(hreaModelerHash);

  await sleep(5000);

  hreaModelerHash = await alice_hrea_modelers.cells[0].call(
    zomeName,
    "update_hrea_modeler",
    {
      nickname: "alice2",
      fields: {
        avatar: "aliceavatar2",
        update: "somenewfield",
      },
    }
  );
  t.ok(hreaModelerHash);

  myHreaModeler = await alice_hrea_modelers.cells[0].call(
    zomeName,
    "get_my_hrea_modeler",
    null
  );
  t.ok(myHreaModeler.agentPubKey);
  t.equal(myHreaModeler.hreaModeler.nickname, "alice2");

  let allhreaModeler = await bob_hrea_modelers.cells[0].call(
    zomeName,
    "get_all_hrea_modelers",
    null
  );
  t.equal(allhreaModeler.length, 2);

  let multipleHreaModeler = await bob_hrea_modelers.cells[0].call(
    zomeName,
    "get_agents_hrea_modeler",
    [alicePubkeyB64, bobPubKeyB64]
  );
  t.equal(multipleHreaModeler.length, 2);

  let hreaModeler = await bob_hrea_modelers.cells[0].call(
    zomeName,
    "search_hrea_modelers",
    {
      nicknamePrefix: "sdf",
    }
  );
  t.equal(hreaModeler.length, 0);

  hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
    nicknamePrefix: "alic",
  });
  t.equal(hreaModeler.length, 2);
  t.ok(hreaModeler[0].agentPubKey);
  t.equal(hreaModeler[1].hreaModeler.nickname, "alice2");

  hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
    nicknamePrefix: "ali",
  });
  t.equal(hreaModeler.length, 2);
  t.ok(hreaModeler[0].agentPubKey);
  t.equal(hreaModeler[1].hreaModeler.nickname, "alice2");
  t.equal(hreaModeler[1].hreaModeler.fields.avatar, "aliceavatar2");

  hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
    nicknamePrefix: "alice",
  });
  t.equal(hreaModeler.length, 2);
  t.ok(hreaModeler[1].agentPubKey);
  t.equal(hreaModeler[1].hreaModeler.nickname, "alice2");

  hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
    nicknamePrefix: "alice_",
  });
  t.equal(hreaModeler.length, 2);
  t.ok(hreaModeler[0].agentPubKey);
  t.equal(hreaModeler[0].hreaModeler.nickname, "alice_bob");
  t.equal(hreaModeler[0].hreaModeler.fields.avatar, "bobboavatar");
});

orchestrator.run();
orchestrator = new Orchestrator();

orchestrator.registerScenario(
  "create a hreaModeler with upper case and search it with lower case",
  async (s, t) => {
    const [alice, bob] = await s.players([conductorConfig]);

    // install your happs into the coductors and destructuring the returned happ data using the same
    // array structure as you created in your installation array.
    const [[alice_hrea_modelers], [bob_hrea_modelers]] = await alice.installAgentsHapps(
      installation
    );

    let hreaModelerHash = await alice_hrea_modelers.cells[0].call(
      zomeName,
      "create_hrea_modeler",
      {
        nickname: "ALIce",
        fields: {
          avatar: "aliceavatar",
        },
      }
    );
    t.ok(hreaModelerHash);
    await sleep(5000);

    let hreaModeler = await bob_hrea_modelers.cells[0].call(
      zomeName,
      "search_hrea_modelers",
      {
        nicknamePrefix: "ali",
      }
    );
    t.equal(hreaModeler.length, 1);
    t.ok(hreaModeler[0].agentPubKey);
    t.equal(hreaModeler[0].hreaModeler.nickname, "ALIce");

    hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
      nicknamePrefix: "aLI",
    });
    t.equal(hreaModeler.length, 1);
    t.ok(hreaModeler[0].agentPubKey);
    t.equal(hreaModeler[0].hreaModeler.nickname, "ALIce");

    hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
      nicknamePrefix: "AlI",
    });
    t.equal(hreaModeler.length, 1);
    t.ok(hreaModeler[0].agentPubKey);
    t.equal(hreaModeler[0].hreaModeler.nickname, "ALIce");

    hreaModeler = await bob_hrea_modelers.cells[0].call(zomeName, "search_hrea_modelers", {
      nicknamePrefix: "ALI",
    });
    t.equal(hreaModeler.length, 1);
    t.ok(hreaModeler[0].agentPubKey);
    t.equal(hreaModeler[0].hreaModeler.nickname, "ALIce");
  }
);

orchestrator.run();
