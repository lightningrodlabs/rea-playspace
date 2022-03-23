import React from "react";

export type MainPanelHeaderProps = {};

const MainPanelHeader: React.FC<MainPanelHeaderProps> = ({ children }) => {
  return <div className="main-panel-header">{children}</div>;
};

export default MainPanelHeader;