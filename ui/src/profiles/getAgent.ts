import { Profile } from "@holochain-open-dev/profiles";
import { useStore } from "../hooks/useStore";

export function getAgent ({ profilesStore, agentPubKey }) {
  const profile: Profile = useStore(profilesStore.fetchAgentProfile(agentPubKey)).value as Profile;
  return profile.nickname;
}