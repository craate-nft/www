/* 
 * HighlightedBottle.js is a component to cover a selected/highlighted bottle.
 * This is included in the home page and when pressing on a specific bottle
 * in the collection.
 * 
 * Unsure how to proceed so created this component.
 */

import React from "react";

import "./HighlightedBottle.css";

export const HighlightedBottle = (props) => {
  return (
    <div className="HighlightedBottle">
      <div className="HighlightedBottle-description">
         {props.bottle.description}
      </div>
      <div className="HighlightedBottle-image">
         <img src={props.bottle.image} />
      </div>
      <div className="HighlightedBottle-main">
         <h1>{props.bottle.name}</h1>
         <h2>{Math.floor(props.bottle.price * 10) / 10} ETH</h2>
         <button onClick={() => props.bottle.Mint()}>Mint Bottle</button>
      </div>
    </div>
  );
}

export default HighlightedBottle;