import { CellClient } from "@holochain-open-dev/cell-client";
import { AgentProfile, MyProfile, ProfilesConfig, ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";
import { InstalledCell } from "@holochain/client";
import { getHolochainClient } from "../hcWebsockets";

let profilesStore: ProfilesStore;
let profilesService: ProfilesService;
let myProfile: AgentProfile;

// can add additonal fields here for Organization or whatever
const config: Partial<ProfilesConfig> = {
  avatarMode: "identicon"
};

export async function getProfilesStore() {
  console.log('getting profile store...');
  if (profilesStore) {
    console.log('exists returning...', profilesStore);
    return profilesStore;
  }
  const client = await getHolochainClient();
  console.log('got holochainClient: ', client);
  const cellData: InstalledCell = client.cellDataByRoleId('reaplayspace'); // maybe this is screwing up?
  console.log('got cellData: ', cellData);
  const cellClient: CellClient = client.forCell(cellData);
  console.log('got cellClient: ', cellClient);
  profilesStore = new ProfilesStore(cellClient, config);
  profilesService = new ProfilesService(cellClient);
  myProfile = await profilesService.getMyProfile();
  return profilesStore;
}

export function getProfilesService() {
  return profilesService;
}

export function getMyProfile() {
  return myProfile;
}

export function setMyProfile(profile: AgentProfile) {
  myProfile = profile;
}