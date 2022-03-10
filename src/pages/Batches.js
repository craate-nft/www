import React, {useState} from "react";
import ReactTooltip from "react-tooltip";

import TileStore from "../components/TileStore.js";
import {PageInfoPanel} from "../components/PageInfoPanel.js";


import CollectSVG from "../svg/collect.svg";
import SolveSVG from "../svg/puzzle.svg";
import EarnSVG from "../svg/salary.svg";


const Batches = (props) => {
  const {active, connected, contractsLoaded, user} = props;

  return (
    <div className="BottleStore-main">
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
