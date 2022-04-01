import {
  SlIcon,
  SlMenu,
  SlMenuItem,
} from "@shoelace-style/shoelace/dist/react";
import React from "react";
import { Link } from "react-router-dom";

export type LeftScreenNavMenuProps = {};

const LeftScreenNavMenu: React.FC<LeftScreenNavMenuProps> = ({}) => {
  return (
    <div className="left-screen-nav-menu">
      <SlMenu>
      <Link to="/flow">
          <SlMenuItem value="Flow">
            <SlIcon slot="prefix" name="node-plus" />
            Flow
          </SlMenuItem>
        </Link>
        <Link to="/resources">
          <SlMenuItem value="Inventory">
            <SlIcon slot="prefix" name="minecart-loaded" />
            Resources
          </SlMenuItem>
        </Link>
        <SlMenuItem value="Agents" disabled>
          Agents
          <SlIcon slot="prefix" name="people" />
        </SlMenuItem>
      </SlMenu>
    </div>
  );
};

export default LeftScreenNavMenu;