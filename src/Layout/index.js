import React from "react";
import { Switch, Route, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Header";
import NotFound from "./NotFound";
import Decklist from "./Decklist";
import Study from "./Study";
import Deck from "./Deck";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";

function Layout() {

  const history = useHistory();

  const initialFormState={
    name: "",
    description: ""
  }

  function handleNewDeckSubmit(newDeck) {
    createDeck(newDeck).then(data => history.push(`/decks/${data.id}`));
  }


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
          <DeckForm 
          title="Create Deck" 
          initialFormState={initialFormState}
          submitAction={handleNewDeckSubmit} />
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
