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
      <Link to="/knowledge">
          <SlMenuItem value="Knowledge">
            <SlIcon slot="prefix" name="node-plus" />
            Knowledge
          </SlMenuItem>
        </Link>
        <Link to="/plan">
          <SlMenuItem value="Plan">
            <SlIcon slot="prefix" name="minecart-loaded" />
            Plan
          </SlMenuItem>
        </Link>
        <Link to="/observation">
          <SlMenuItem value="Observation">
            Observation
            <SlIcon slot="prefix" name="people" />
          </SlMenuItem>
        </Link>
      </SlMenu>
    </div>
  );
};

export default LeftScreenNavMenu;