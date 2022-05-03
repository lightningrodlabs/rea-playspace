import { CellClient } from "@holochain-open-dev/cell-client";
import { ProfilesConfig, ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";
import { InstalledCell } from "@holochain/client";
import { getHolochainClient } from "../hcWebsockets";

let profilesStore: ProfilesStore;
let profilesService: ProfilesService;

const config: Partial<ProfilesConfig> = {
  avatarMode: "identicon"
};

export async function getProfilesStore() {
  if (profilesStore) {
    return profilesStore;
  }
  const client = await getHolochainClient();
  const cellData: InstalledCell = client.cellDataByRoleId('reaplayspace');
  const cellClient: CellClient = client.forCell(cellData);
  profilesStore = new ProfilesStore(cellClient, config);
  profilesService = new ProfilesService(cellClient);
  return profilesStore;
}

export function getProfilesService() {
  return profilesService;
}