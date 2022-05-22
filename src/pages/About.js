import React, {useState} from "react";
import HeaderBackground from "../components/HeaderBackground";

const FAQSection = (props) => {
  const [show, setShow] = useState(props.open || false);
  const glyph = show ? "[-]" : "[+]";
  return (
    <div className="faq-section">
      <div className="faq-question" onClick={() => {setShow(!show)}}>
        {props.question}
        <span className="grow"></span>
        <span style={{marginRight: "50px"}} className="clickable">{glyph}</span>
      </div>
      {show && <div className="faq-body">{props.children}</div>}
    </div>
  );
}

const About = (props) => {
  return (
    <div className="faq-main">
      <HeaderBackground {...props} />
      <FAQSection question="What is this all about?" open={true}>
        <p>
          Craate NFT is a brand new platform bridging the divide between physical
          bottles in the real world, and NFT representations of the same!
        </p>
        <p>
          Buy, sell and trade bottles today!
        </p>
      </FAQSection>

      <FAQSection question="How does it work?">
        <p>
          Each batch of bottles has a limited number of bottles, each with their
          own perks.
        </p>
        <p>
          Batches are owned by the vineyard that wishes to sell NFTs of their
          bottles on our platform.
        </p>
      </FAQSection>

      <FAQSection question="Other market integration?">
        <p>
          All bottle NFTs are tradeable freely on our own platform, as well as
          3rd party platforms like OpenSea and Rarible.
        </p>
      </FAQSection>

      <FAQSection question="Can I see the code?">
        <p>
          All of the code involved in this project is available on GitHub and is
          100% open source. Check out our
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/craate-nft">GitHub project page</a> for more info.
        </p>
        <p>
          We love feedback, and would appreciate your thoughts either in our
          <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/craate-nft">Discord</a>,
          <a target="_blank" rel="noopener noreferrer" href="https://reddit.com/r/craate-nft">Reddit</a>,
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/craate-nft">GitHub</a> channels.
        </p>
      </FAQSection>
    </div>
  );
}

export default About;
