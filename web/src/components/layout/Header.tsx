import React from "react";
import {
  SlInput,
  SlAvatar,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";

export type HeaderProps = {
  name: string
};

const Header: React.FC<HeaderProps> = ({name}) => {
  return (
    <div className="header">
      <SlAvatar
        image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
        label="Avatar of a gray tabby kitten looking down"
      />
      <div className="search">
        <SlInput placeholder="Search..." clearable>
          <SlIcon name="search" slot="prefix"></SlIcon>{" "}
        </SlInput>
      </div>

      <div>
        <SlAvatar shape="circle" label="Circle avatar" />
        {" "}
        {name.slice(0, 8)}...
      </div>
    </div>
  );
};

export default Header;