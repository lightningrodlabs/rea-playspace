import { APP_ID } from "../holochainConf";
import { getHolochainClient, setAgentPubKey, setCellId } from '../hcWebsockets';
import { AppSignal, AppSignalCb, InstalledCell } from "@holochain/client";
import { CellClient } from "@holochain-open-dev/cell-client";
import { Profile, ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";
import { getDataStore, DataStore } from "./DataStore";
import { buildModel, Pathed, WithPath } from "data-providers";
import { wrapReadable, SyncExternalStoreApi } from "store-adaptors";
import { ZomeApi, SignalMessage, LocalstoreProvider, ProjectProvider } from "data-providers";
import { ModelTree, ModelKinds } from "./models/Application";

let dataStorePromise: Promise<DataStore>;
let profilesStore: ProfilesStore;
let wrappedProfileReadable;

export function getWrappedProfileReadable(): SyncExternalStoreApi<Profile> {
  return wrappedProfileReadable;
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

    const zomeApi = new ZomeApi(client, cell.cell_id);
    const dataStore = getDataStore();
    dataStore.addProvider('project', new ProjectProvider(ModelTree, ModelKinds, zomeApi));
    dataStore.addProvider('localstore', new LocalstoreProvider(ModelTree, ModelKinds));
    await dataStore.fetchOrCreateRoot();

    profilesStore = await connectProfiles();
    const myProfileReadable = await profilesStore.fetchMyProfile();
    wrappedProfileReadable = wrapReadable(myProfileReadable);
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
        let PDO = buildModel<{}, { id: string }>(ModelTree, ModelKinds, path, signalMessage.data);
        store.setLocal(PDO as Pathed<{ id: string }>);
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
