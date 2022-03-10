import React, {useState} from "react";
import {useParams} from "react-router-dom";

import {Loading} from "../components/Loading.js";
import {bottleDataUri, bottleImgUri, nftId, prettyfyId, getTokenBalance} from "../components/contractHelpers.js";

import OpenSeaLogo from '../svg/opensea-logo.svg';

const getBottleInfo = async (id) => {
  const bottleDescJSON = bottleDataUri(id);
  const rsp = await fetch(bottleDescJSON);
  return await rsp.json();
}

export const BottleInner = (props) => {
  const prettyId = prettyfyId(nftId(props.id));
  const [desc, setDesc] = useState();
  const [tokInfo, setTokInfo] = useState();

  if (!desc && props.user && props.bottle) {
    getBottleInfo(props.id)
      .then(setDesc);
  }
  if (!tokInfo && props.user && props.bottle) {
    getTokenBalance(props.bottle, props.user, props.id)
      .then(setTokInfo);
  }

  if (!desc || !tokInfo) {
    return (
      <div className="Shard-main">
        <Loading message="Fetching bottle details" />
      </div>
    );
  }

  return (
    <div className="shard-main">
      <div className="shard-header">
        {desc.name}
        <span className="grow" />
      </div>
      <div className="bg">
        <img src={bottleImgUri(props.id)} alt={props.id} />
      </div>
      <p>{desc.description}</p>
      <p>The NFT id for this bottle is {prettyId}.</p>
      {tokInfo.supply.toNumber() > 0 && <>
        <p>There are currently {tokInfo.supply.toString()} of these bottles in existence, and you own {tokInfo.balance.toString()} of them!</p>
        <div className="social-link">
          <div>View this NFT on: </div>
          <div>
            <a target="_blank" rel="noopener noreferrer" href={"https://opensea.io/assets/"+props.bottle.address+"/"+props.id}>
              <img src={OpenSeaLogo} alt="OpenSea" /><span>OpenSea</span>
            </a>
          </div>
        </div>
      </>}
      {tokInfo.supply.toNumber() === 0 && <>
        <p>There are no copies of this token in existence! Once minted, it will be visible for trade on OpenSea etc.</p>
      </>}
    </div>
  );
}

/*
 *  If we end up rendering shards as a separate page, use this component to
 *  wrap the `BottleInner` and parse the hex string etc from the URL params.
 */
export const Bottle = (props) => {
  let {id} = useParams();
  const intId = parseInt(id, 16);
  return (
    <div className="shard-page">
      <BottleInner {...props} id={intId} />
    </div>
  );
}

export default Bottle;