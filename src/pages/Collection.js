/*
 * Main page for viewing (minted?) bottles
 */

import React, { useState } from "react";
import { BottlePreview } from "../components/BottlePreview";
import HighlightedBottle from "../components/HighlightedBottle";
import NavBar from "../components/NavBar";

import "./Collection.css";

/* used temporarily for bottle data. unsure of how to connect back to front here. */
var tempBottle = {
   name: "2005 Caymus Special Selection",
   description: "Lorem Ipsum: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n\nLorem Ipsum: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
   price: 0.72949,
   image: require("../img/Caymus.png"),
   sellable: true,
   Mint: () => { console.log("mint here") },
   Sell: () => { console.log("sell here") },
}

const Collection = (props) => {

   const [selectedBottle, setSelectedBottle] = useState(null);

   var tempBottles = []; // would get list of bottles from props i assume
   for (let i = 0; i < 25; i++) {
      tempBottles.push({
         name: "Lorem Ipsum",
         description: "Lorem Ipsum: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n\nLorem Ipsum: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
         icon: require("../img/Caymus.png"),
      })
   }
   var bottles = tempBottles.map((bottle) => {
      return <BottlePreview 
         icon={bottle.icon} 
         name={bottle.name} 
         clickFunc={() => setSelectedBottle(tempBottle)} // this should be unique per bottle but for layout purposes just refers to tempBottle declared above
      />
   });

   return (
      <div className="Collection">
         <div className="Collection-header">
            <h1>YOUR COLLECTION</h1>
            <NavBar {...props} />
         </div>
         <div className="Collection-bottles">
            <div className="Collection-bottles-scroll">
               {bottles}
            </div>
         </div>
         <div className="Collection-footer">

         </div>
         {(selectedBottle != null) ? (<div className="Collection-selection">
            <HighlightedBottle bottle={selectedBottle} closeFunc={() => setSelectedBottle(null)} />
            <div className="Collection-selection-overlay"></div>
         </div>) : ""}
      </div>
   )
}

export default Collection;