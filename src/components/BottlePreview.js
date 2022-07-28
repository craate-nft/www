/*
 * BottlePreview.js is a component that displays just the 
 * image & name preview of a bottle. It can be clicked on for further functionality
 */

import React from "react";

import "./BottlePreview.css";

export const BottlePreview = (props) => {
   return (
      <div className="BottlePreview" onClick={() => (props.clickFunc != undefined) ? props.clickFunc() : null}>
         <img src={props.icon} alt={props.name} />
         <p>{props.name}</p>
      </div>
   )
}