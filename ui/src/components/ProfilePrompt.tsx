import { FC } from "react";
import { CreateProfile } from "../elements";
import { Profile } from "@holochain-open-dev/profiles";
import { useStore } from "../data/hooks/useStore";
import { getWrappedProfileReadable } from "../data/Connection";

interface Props {
}

const ProfilePrompt: FC<Props> = ({children}) => {
  const wrappedProfileReadable = getWrappedProfileReadable();
  const profile = useStore<Profile>(wrappedProfileReadable);

  const RenderPrompt = () => {
    if (!profile) {
      return (
        <div className="profile-prompt">
            <CreateProfile></CreateProfile>
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