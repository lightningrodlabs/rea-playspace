import ZomeApi from "./DataProviders/holochain/api/zomeApi";
import { getHolochainClient, setAgentPubKey, setCellId } from '../hcWebsockets';
import { ProjectProvider } from "./DataProviders/holochain/project";
import { APP_ID } from "../holochainConf";
import { ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";
import { AppSignal, AppSignalCb, InstalledCell } from "@holochain/client";
import { CellClient } from "@holochain-open-dev/cell-client";
import { LocalstoreProvider } from "./DataProviders/local/localstore";
import getDataStore, { DataStore } from "./DataStore";
import { SignalMessage } from "./models/Application/SignalMessage";
import { getAlmostLastPart, getLastPart, PathedData } from "./models/PathedData";
import { constructFromObj } from "./models/ModelConstructors";

let dataStorePromise: Promise<DataStore>;
let profilesStore: ProfilesStore;
let myProfileReadable;

export function getMyProfileReadable() {
  return myProfileReadable;
}
/**
 * Initialize Holochain WS connection, set up Zome API client and DataStore singletons.
 *
 * By the time this promise resolves, any call to `getDataStore` is gauranteed to
 * have a reference to our singleton
 */

export async function initConnection(): Promise<DataStore> {
  dataStorePromise = new Promise(async (res) => {
    const client = await getHolochainClient();
    client.addSignalHandler(signalCb);
    const appInfo = await client.appWebsocket.appInfo({
      installed_app_id: APP_ID
    });
    const cell = appInfo.cell_data[0];
    const [_dnaHash, agentPubKey] = cell.cell_id;
    setAgentPubKey(agentPubKey);
    setCellId(cell.cell_id);

    const zomeApi = new ZomeApi(client);
    const dataStore = getDataStore();
    dataStore.addProvider('project', new ProjectProvider(zomeApi));
    dataStore.addProvider('localstore', new LocalstoreProvider());
    await dataStore.fetchOrCreateRoot();

    profilesStore = await connectProfiles();
    myProfileReadable = await profilesStore.fetchMyProfile();
    res(dataStore);
  });
  return dataStorePromise;
}

async function connectProfiles(): Promise<ProfilesStore> {
  const client = await getHolochainClient();
  const appInfo = await client.appWebsocket.appInfo({
    installed_app_id: APP_ID
  });
  const cell: InstalledCell = appInfo.cell_data[0];
  const profilesService = new ProfilesService(new CellClient(client, cell));
  return new ProfilesStore(profilesService, {
    avatarMode: "avatar-optional",
  });
}
const signalCb: AppSignalCb = async (signal: AppSignal) => {
  const store = getDataStore();
  const message = signal.data.payload.message;
  const signalMessage = new SignalMessage(JSON.parse(message));

  switch (signalMessage.op) {
    case 'put':
      if (signalMessage.data) {
        const path = signalMessage.path;
        const type = getAlmostLastPart(path);
        const name = getLastPart(path);
        let PDO: PathedData = constructFromObj(type, name, signalMessage.data);
        store.setLocal(PDO);
      }
      break;
    case 'delete':
      store.deleteLocal(signalMessage.path);
      break;
    default:
      console.warn(`Unknown op ${signalMessage.op}`);
      break;
  }
};

export function getProfilesStore() {
  return profilesStore;
}
