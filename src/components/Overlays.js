import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import {BottleInner} from "../pages/Bottle.js";

////////////////////////////////////////////////////////////////////////////////

var Web3 = require("web3");
const toBN = Web3.utils.toBN;

////////////////////////////////////////////////////////////////////////////////

export const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="modal" onClick={()=>{props.doClose && props.doClose()}}>
      <div className="modal-body" onClick={(e)=>{e.stopPropagation()}}>
        {props.children}
      </div>
    </div>,
    document.querySelector("#modal"));
}


////////////////////////////////////////////////////////////////////////////////

export const useInput = (type, def) => {
  const [value, setValue] = useState(def);
  const input = <input value={value}
                        onChange={e => setValue(e.target.value)}
                        type={type} />;
  return [value, input];
}

////////////////////////////////////////////////////////////////////////////////

export const useEscapeKey = (onEscape) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27)
        onEscape();
      };
      window.addEventListener("keydown", handleEsc);

      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }, [onEscape]);
}

////////////////////////////////////////////////////////////////////////////////

export const MintBottleModal = (props) => {
  const costWei = Web3.utils.toWei(props.costInEther, "ether")
  const [numToBuy, numToBuyInput] = useInput("number", 1);
  const [isTxPending, setTxPending] = useState(false);
  const [tx, setTx] = useState(undefined);
  const [err, setErr] = useState(undefined);

  //////////////////////////////////////////////////////////////////////////////

  const mintBottleForETH = async () => {
    setTx(undefined);
    setTxPending(true);

    const rsp = await props.bottleWrapper.buyBottlesForETH(props.batchId, numToBuy, {
      value: costWei * numToBuy,
      from: props.user
    }).catch((err) => {
      setErr(err)
    });

    if (rsp) {
      setTx(rsp.tx);
      setTxPending(false);
      window.location.href = 'http://craatenft.com';
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  const closeModal = () => {
    setErr(undefined);
    setTxPending(false);
    setTx(undefined);
    props.close();
  }

  useEscapeKey(() => closeModal());

  console.log(costWei)

  // const ethBottleCost = props.costInEther;
  // const bnNumToBuy = toBN(numToBuy.toString());
  // const ethCostWei = ethBottleCost.mul(bnNumToBuy);
  // const ethCost = Web3.utils.fromWei(ethCostWei, "ether").toString();

  return (
    <>
      {props.batchId >= 0 &&
        <Modal doClose={()=>{closeModal()}}>
          <div className="BottleStore-modal">
            <h1>Minting bottles from batch {props.batchId}</h1>
            <br></br>
            {!isTxPending && !tx &&
              <>
                <div className="col">
                  <div>Number of bottles to mint:</div>
                </div>
                <div className="col input-div">
                  {numToBuyInput}
                </div>
              </>}
              {isTxPending && !tx &&
                <div className="col">
                  <div>Transaction pending ...</div>
                </div>
              }
              {!isTxPending && tx &&
                <div className="col">
                  <div><a className="clickable" href={"https://etherscan.io/tx/"+tx}>view tx etherscan</a></div>
                </div>
              }
              <>
                <br></br>
                <div className="col">
                  {!isTxPending && !tx && <>
                    <div className="clickable" onClick={() => {mintBottleForETH();}}>Use {props.costInEther} ETH</div>
                  </>}
                  {err &&
                    <div className="col">
                      <div>Uh oh, thats an error ...</div>
                    </div>
                  }
                  <div className="grow"></div>
                  <div className="clickable" onClick={() => {closeModal()}}>CLOSE</div>
                </div>
              </>
          </div>
        </Modal>
      }
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////

export const BottlePreviewModal = (props) => {

  useEscapeKey(() => props.close());

  return (
    <>
      {props.tokenId > 0 &&
        <Modal>
          <div className="BottleStore-modal">
            <BottleInner {...props} id={props.tokenId} />
            <br></br>
            <div className="col">
              <div className="grow"></div>
              <div className="clickable" onClick={() => {props.close()}}>CLOSE</div>
            </div>
          </div>
        </Modal>
      }
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////