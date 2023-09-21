import React from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Home/DeckList";
import Study from "./Study/Study";
import Deck from "./Deck/Deck";
import CreateDeck from "./DeckForms/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
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
