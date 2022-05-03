import React, { useEffect, useState } from "react";
import {
  CreateProfile
} from "../elements";
import { getMyProfile, getProfilesService, setMyProfile } from "../data/ProfilesStore";
import { ProfilesService } from "@holochain-open-dev/profiles";

interface Props {}

/**
 * 
 * This is a workaround because ProfilePrompt doesn't work with React out 
 * of the box.
 */
const ProfilePrompt: React.FC<Props> = ({children}) => {
  const [profileExists, setProfileExists] = useState<Boolean>(false);
  let service: ProfilesService = getProfilesService();

  function handleCreateProfile() {
    service.getMyProfile().then((profile) => {
      if (profile) {
        setMyProfile(profile);
        // I don't want this. Right now it's just to trigger a re-render
        setProfileExists(true);
      }
    });
  }
  window.addEventListener('profile-created', handleCreateProfile);
  useEffect(() => {
    service.getMyProfile().then((profile) => {
      setMyProfile(profile);
      if (profile) {
        setProfileExists(true);
      }
    });
  }, []);

  const RenderPrompt = () => {
    if (getMyProfile() == null) {
      return (
        <div
        style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "flex": "1"}}>
          <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
            <CreateProfile></CreateProfile>
          </div>
        </div>
      );
    } else {
      // children is the rest of the app,  <Main />. Can this 
      // be improved?
      return(
        <slot>{children}</slot>
      )
    }
  }

  return(
    <RenderPrompt></RenderPrompt>
  )
}

export default ProfilePrompt;