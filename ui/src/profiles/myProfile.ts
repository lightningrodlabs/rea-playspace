import { Profile, ProfilesStore } from "@holochain-open-dev/profiles";
import { useStore } from "../hooks/useStore";


export async function myProfile (profilesStore: ProfilesStore): Promise<Profile> {
  let myProfile;
  profilesStore.fetchMyProfile().then(readable => {
    myProfile = useStore(readable).value as Profile
  });

  // const myProfile: Profile = useStore(profilesStore.fetchMyProfile()).value as Profile;
  return myProfile;
}