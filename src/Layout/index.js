import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Header";
import NotFound from "./NotFound";
import Decklist from "./Decklist";
import Study from "./Study";
import Deck from "./Deck";
import CreateDeck from "./CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route exact path="/">
        <Decklist />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route exact path="/decks/:deckId">
          <Deck />
        </Route>
        <Route>
        <NotFound />
        </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
