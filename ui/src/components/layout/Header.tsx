import React, { useState } from "react";
import { SlButton, SlDrawer, SlIconButton } from '@shoelace-style/shoelace/dist/react';
import { useNavigate } from 'react-router-dom';

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
    setOpen(false);
  }

  const menuStyle = {
    fontSize: '2rem',
    width:'20px'
  };

  return (
    <>
      <SlDrawer label="Menu" open={open} placement="start" onSlAfterHide={() => setOpen(false)}>
        <menu style={{listStyleType: "none"}}>
          <li>
            <h2 className={'menu-item'} onClick={()=>handleNavigate("")}>Flow</h2>
          </li>
          <li>
            <h2 className={'menu-item'} onClick={()=>handleNavigate("agents")}>Agents</h2>
          </li>
          <li>
            <h2 className={'menu-item'} onClick={()=>handleNavigate("resource-specifications")}>Resource Specifications</h2>
          </li>
          <li>
            <h2 className={'menu-item'} onClick={()=>handleNavigate("resources")}>Resources</h2>
          </li>
          <li>
            <h2 className={'menu-item'} onClick={()=>handleNavigate("agents")}>Agents</h2>
          </li>
          <li>
            <h2 className={'menu-item'} onClick={()=>handleNavigate("events")}>Events</h2>
          </li>
        </menu>
        <SlButton slot="footer" variant="primary" onClick={() => setOpen(false)}>
          Close
        </SlButton>
      </SlDrawer>
      <SlIconButton name="list" label="Edit" style={menuStyle} onClick={() => setOpen(true)}/>
    </>
  );
};

export default Header;