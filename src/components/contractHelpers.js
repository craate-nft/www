import Web3 from "web3";

export const prettyfyId = (strId) => {
  let s = "0x";
  let zs = strId.length;
  let ze = 0;
  for (var i = 0; i < strId.length; i++) {
    if (strId[i] === '0' && i < zs) zs = i;
    if (strId[i] === '0' && i > ze) ze = i;
  }
  if (zs < 4) zs = 4;
  let lenLeft = 64 - ze;
  if (lenLeft < 5) {
    ze -= (5 - lenLeft);
  }
  for (i = 0; i < strId.length; i++) {
    if (i === zs) { s += "..."; }
    if (i <= ze && i >= zs) continue;
    s += strId[i];
  }
  return s;
}

export const nftId = (id) => {
  return Number(id).toString(16).padStart(64, 0);
}

export const bottleImgUri = (id) => {
  return "https://raw.githubusercontent.com/craate-nft/metadata/master/bottle/"+nftId(id)+".gif";
}

export const bottleDataUri = (id) => {
  return "https://raw.githubusercontent.com/craate-nft/metadata/master/bottle/"+nftId(id)+".json";
}

// export const packImgUri = (id) => {
//   return "https://raw.githubusercontent.com/craate-nft/metadata/master/pack/"+nftId(id)+".png";
// }

// export const packGifUri = () => {
//   return "https://raw.githubusercontent.com/craate-nft/metadata/master/img/rift-seethru.gif";
// }

////////////////////////////////////////////////////////////////////////////////

export const getAllBatchInfo = async (bottle, user, numBatches) => {
  let batches = [];
  for (var batch = 1; batch <= numBatches; batch++) {
    batches.push(await getBatchInfo(bottle, user, batch));
  }
  return batches;
}

////////////////////////////////////////////////////////////////////////////////

export const getTokenBalance = async (bottle, user, batch) => {
  const _b = await bottle.balanceOf(user, batch);
  const _t = await bottle.totalSupply(batch);
  return {
    balance: _b,
    supply: _t,
  }
}

export const getBatchInfo = async (bottle, user, batch) => {
  const _batchInfo = await bottle.batchInfo(batch);
  const _b = await bottle.balanceOf(user, batch);
  return {
    batch: batch,
    balance: _b,
    maxBottles: _batchInfo[0],
    numBottles: _batchInfo[1],
    ethCost: _batchInfo[2],
  };
}


////////////////////////////////////////////////////////////////////////////////
