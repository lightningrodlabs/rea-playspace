import React, { MouseEventHandler } from "react";

export type Props = {
  onClick: MouseEventHandler
};

const Header: React.FC<Props> = (props: Props) => {
  return (
    <div className="pi-hacker-row">
      <div className="pi-hacker-spacer"></div>
      <div className="pi-hacker-button" onClick={props.onClick}>∏</div>
    </div>
  );
};

export default Header;