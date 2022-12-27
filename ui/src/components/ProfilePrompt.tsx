import { FC } from "react";
import { CreateProfile } from "./ProfileComponents";
import { Profile } from "@holochain-open-dev/profiles";
import { useStore } from "react-store-adaptors";

interface Props {
  wrappedProfileReadable
}

const ProfilePrompt: FC<Props> = ({wrappedProfileReadable, children}) => {
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