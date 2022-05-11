import React, {useState} from "react";
import ReactTooltip from "react-tooltip";

import HighlightedBottle from "../components/HighlightedBottle.js";

import TileStore from "../components/TileStore.js";
import {PageInfoPanel} from "../components/PageInfoPanel.js";


import CollectSVG from "../svg/collect.svg";
import SolveSVG from "../svg/puzzle.svg";
import EarnSVG from "../svg/salary.svg";

/* used temporarily for bottle data. unsure of how to connect back to front here. */
var tempBottle = {
  name: "2005 Caymus Special Selection",
  description: "Lorem Ipsum: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n\nLorem Ipsum: dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  price: 0.72949,
  image: require("../img/Caymus.png"),
  Mint: () => { console.log("mint here") }
}

const Batches = (props) => {
  const {active, connected, contractsLoaded, user} = props;

  return (
    <div className="BottleStore-main">
      <HighlightedBottle bottle={tempBottle}/>
      <div className="tooltips">
        <ReactTooltip id="infoEscapeTooltip" arrowColor="var(--color-font)">
          <p><span role="img" aria-label="burn">🔥</span> Mint bottles from available batches.</p>
          <p><span role="img" aria-label="burn">🔥</span> Sell or Trade bottle NFTs.</p>
        </ReactTooltip>
      </div>
      <div className="Batches-main">
        <br></br>
        {!(active && connected && user && contractsLoaded) &&
          <PageInfoPanel {...props} />
        }
        {active && connected && user && contractsLoaded &&
          <TileStore {...props} />
        }
      </div>
    </div>
  );
}

export default Batches;
