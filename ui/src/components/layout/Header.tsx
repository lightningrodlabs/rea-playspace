import React from "react";
import { getMyProfile } from "../../data/DataStore";

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  return (
    <div className="header">
      <div>
        {" "}
         {/* {getMyProfile().nickname.slice(0, 8)} */}
      </div>
    </div>
  );
};

export default Header;