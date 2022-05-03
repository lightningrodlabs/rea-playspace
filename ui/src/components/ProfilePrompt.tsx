import React, { useEffect, useState } from "react";
import {
  CreateProfile
} from "../elements";
import { getProfilesService, getProfilesStore } from "../data/ProfilesStore";
import { AgentProfile, Profile, ProfilesService, ProfilesStore } from "@holochain-open-dev/profiles";

import {
  Button,
  CircularProgress,
  TextField,
} from '@scoped-elements/material-web';

interface Props {}

const ProfilePrompt: React.FC<Props> = ({children}) => {
  const [myProfile, setMyProfile] = useState<AgentProfile>();
  let service: ProfilesService = getProfilesService();

  window.addEventListener('profile-created', (event) => {
    service.getMyProfile().then((profile) => {
      console.log('profile to set: ', profile);
      setMyProfile(profile);
    });
  });

  useEffect(() => {
    service.getMyProfile().then((profile) => {
      console.log('profile to set: ', profile);
      setMyProfile(profile);
    });
  }, []);

  console.log("profile: ", myProfile)

  const RenderPrompt = () => {
    if (myProfile == null) {
      return (
        <div
        style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent": "center", "flex": "1"}}>
          <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
            <slot name="hero"></slot>
            <CreateProfile></CreateProfile>
          </div>
        </div>
      );
    } else {
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