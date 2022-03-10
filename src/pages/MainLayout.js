import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import PuzzleViewer from "./PuzzleViewer.js";
import Batches from "./Batches.js";
import Bottle from "./Bottle.js";

import About from "./About.js";

const Redirect = (props) => {
  let history = useHistory();
  const {to} = props;
  history.push(to);
  return <></>;
}

const MainLayout = (props) => {
  return (
    <Switch>
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path="/">
        <Batches page="Home" {...props} />
      </Route>
      <Route exact path="/about">
        <About></About>
      </Route>
      <Route exact path="/scene/:sid/puzzle/:pid">
        <PuzzleViewer page="PuzzleViewer" {...props} />
      </Route>
      <Route exact path="/shard/:id">
        <Bottle page="Bottle" {...props} />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default MainLayout;