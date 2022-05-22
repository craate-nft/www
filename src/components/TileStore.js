import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import ReactTooltip from "react-tooltip";

import {Loading} from "./Loading.js";
import {getAllBatchInfo, bottleImgUri } from "./contractHelpers.js";
import {MintBottleModal} from "./Overlays.js";
import {BottlePreview} from "./BottlePreview.js"

import "./TileStore.css";

import BuySVG from "../svg/buy.svg";

////////////////////////////////////////////////////////////////////////////////

var Web3 = require("web3");

////////////////////////////////////////////////////////////////////////////////

const TileStore = (props) => {
  const {user, bottle, numBatches} = props;

  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const [buyBottlesForBatchId, setBuyBottlesForBatchId] = useState(-1);
  const [costInEther, setCostInEther] = useState(Web3.utils.fromWei("0", "ether"));

  //////////////////////////////////////////////////////////////////////////////

  const gotoBatch = (bid) => {
    history.push("/batch/" + bid)
  }

  //////////////////////////////////////////////////////////////////////////////

  const updateBatchInfo = async (bidx) => {
    let desc = await getAllBatchInfo(bottle, user, bidx);
    let found = false;
    let _batches = batches.map((bdesc) => {
      if (bdesc.batchId === desc.batchId) {
        found = true;
        return desc;
      }
      return bdesc;
    });
    if (found) {
      setBatches(_batches);
    } else {
      setBatches(...batches, desc);
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (!bottle || !user || !numBatches) return;
    getAllBatchInfo(bottle, user, numBatches.toNumber())
      .then((_batches) => {
        setBatches(_batches)
        setLoading(false);
      });
  }, [isLoading, bottle, user, numBatches]);

  if (isLoading) {
    return (
      <div className="info-main">
        <Loading message="Loading batches" />
      </div>
    );
  }

  //////////////////////////////////////////////////////////////////////////////
  const batchesDOM = batches.map((batch, i) => {
    const batchId = batch.batch;
    const cEth = Web3.utils.fromWei(batch.ethCost, "ether");
    return <BottlePreview name="Test Bottle" icon={require("../img/Caymus.png")} />
    /*
    return (
      <div key={batchId} className="BottleStore-pack">
        <div className="scene-list">
          <div className="pack-holder">
            <div className="pack"
                 onClick={()=>{}}
                 data-tip data-for="packTooltip">
              <img className="bg" src={bottleImgUri(batch.batch)} alt={batchId} />
            </div>
          </div>
          <div className="scene-details">
            <div className="col">
              <div>batch #{batchId}</div>
              <div>{batch.numBottles.toString()} / {batch.maxBottles.toString()} bottles minted</div>
            </div>
            <div className="col">
              <div>mint cost:</div>
              <div>{cEth} ETH</div>
            </div>
            <div className="col">
              <div className="grow"></div>
              <div className="buy-tiles clickable" onClick={()=>{
                setCostInEther(cEth);
                setBuyBottlesForBatchId(batchId);
              }}>
                <img src={BuySVG} alt="mint"></img> mint bottle(s)
              </div>
            </div>
            {/* {scene.tilesLeft.toNumber() === 0 &&
              <div>All sold out, trade shards to solve puzzles!</div>
            } }
          </div>
        </div>
      </div>
    );
    */
  });

  return (
    <>
        <MintBottleModal
          bottle={props.bottle}
          bottleWrapper={props.bottleWrapper}
          user={props.user}
          batchId={buyBottlesForBatchId}
          costInEther={costInEther}
          updateBatchInfo={updateBatchInfo}
          close={() => {setBuyBottlesForBatchId(-1)}} />

        <div className="BottleStore-list">
          {/* removing this header <h4>Current batches</h4> */}
          {batchesDOM}
        </div>
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////

export default TileStore;