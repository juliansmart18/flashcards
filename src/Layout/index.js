import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import Header from "./Header";
import NotFound from "./NotFound";
import Decklist from "./Decklist";
import Study from "./Study";
import Deck from "./Deck";
import DeckForm from "./DeckForm";
import { createDeck, listDecks } from "../utils/api";

function Layout() {

  const [decks, setDecks] = useState([]);

  function fetchDecks() {
   listDecks().then(data => setDecks(data));
  }
  useEffect(fetchDecks, []);

  const initialFormState={
    name: '',
    description: ''
  }

  function handleSubmit(newDeck) {
    createDeck(newDeck).then(data => fetchDecks())
  }

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
        <Route exact path="/">
        <Decklist decks={decks} />
        </Route>
        <Route exact path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/new">
          <DeckForm 
          initialFormState={initialFormState} 
          title="Create Deck" 
          handleSubmit={handleSubmit} />
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
