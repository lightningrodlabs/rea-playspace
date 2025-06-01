import React, { JSX } from "react";

export type MainPanelHeaderProps = {
  children: JSX.Element | JSX.Element[]
};

const MainPanelHeader: React.FC<MainPanelHeaderProps> = ({ children }) => {
  return <div className="main-panel-header">{children}</div>;
};

export default MainPanelHeader;