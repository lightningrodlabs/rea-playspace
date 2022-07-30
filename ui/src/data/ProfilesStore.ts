import { CellClient } from "@holochain-open-dev/cell-client";
import { AgentPubKeyB64 } from "@holochain-open-dev/core-types";
import { AgentProfile, ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";
import { InstalledCell } from "@holochain/client";
import { getHolochainClient } from "../hcWebsockets";
import { APP_ID } from "../holochainConf";

let profilesStore: ProfilesStore;
let profilesService: ProfilesService;
let myProfile: AgentProfile;


export async function getProfilesStore() {
  if (profilesStore !== undefined) {
    return profilesStore;
  }
  const client = await getHolochainClient();
  const appInfo = await client.appWebsocket.appInfo({
    installed_app_id: APP_ID
  });
  const cell: InstalledCell = appInfo.cell_data[0];
  const cellClient = new CellClient(client, cell);
  profilesService = new ProfilesService(cellClient);
  const newProfilesStore = new ProfilesStore(profilesService, {
    avatarMode: "avatar-optional",
  });

  profilesStore = newProfilesStore
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

export async function getProfileNameById(id: AgentPubKeyB64) {
  return (await profilesService.getAgentProfile(id)).profile.nickname;
}