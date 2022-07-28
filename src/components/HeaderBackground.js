/*
 * "Main" header for site with colored background & named
 * logo & icon, with nav bar.
 */

import React from "react";

import "./HeaderBackground.css";

import NavBar from "./NavBar.js";

const HeaderBackground = (props) => {
   return (
      <div className="HeaderBackground">
         <div className="HeaderBackground-title">
            <h1>CRAATE NFT</h1>
          </div>
          <NavBar {...props} />
          <div className="HeaderBackground-background">
            <div className="HeaderBackground-background-overlay"></div>
          </div>
      </div>
   )
}

export default HeaderBackground