import { useState, FC, useEffect } from "react";
import {
CreateProfile
} from "../elements";
import { Profile } from "@holochain-open-dev/profiles";
import { useStore } from "../hooks/useStore";
import { getMyProfileReadable } from "../data/Connection";

interface Props {
}

const ProfilePrompt: FC<Props> = ({children}) => {
  const [profile, setProfile] = useState<Profile>();

  let storeSubscriber = useStore(getMyProfileReadable());

  useEffect(() => {
    if (storeSubscriber.value !== undefined && storeSubscriber.value !== null) {
      setProfile(storeSubscriber.value as Profile);
    }
  }, []);

  const handleProfileCreated = (e) => {
    setProfile(e.detail.profile);
  }

  const RenderPrompt = () => {
    if (!profile) {
      return (
        <div className="profile-prompt">
            <CreateProfile onProfileCreated={(e) => handleProfileCreated(e)}></CreateProfile>
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