import React from "react";
import {
  SlInput,
  SlAvatar,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";
import { getMyProfile } from "../../data/ProfilesStore";

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  return (
    <div className="header">
      <div>
        <SlAvatar shape="circle" label="Circle avatar" />
        {" "}
        {getMyProfile().profile.nickname.slice(0, 8)}
      </div>
    </div>
  );
};

export default Header;