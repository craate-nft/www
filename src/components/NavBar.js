/*
 * Top nav bar with link redirects
 */

import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
   return (<div className="App-nav">
      <NavLink exact activeClassName="isActive" to="/" data-tip data-for="networkInfoTooltip">Home</NavLink>
      <NavLink exact activeClassName="isActive" to="/about">About Us</NavLink>
      {
      (props.connected) ? 
         (<NavLink exact activeClassName="isActive" to="/collection">Collection</NavLink>) :
         (<a onClick={() => props.connectWallet()}>Collection</a>)
      }
      <NavLink exact activeClassName="isActive" to="/vinyards">Vinyards</NavLink>
      <NavLink exact activeClassName="isActive" to="/contact">Contact Us</NavLink>
      <a onClick={() => props.connectWallet()}>Log In</a>
   </div>)
}

export default NavBar;