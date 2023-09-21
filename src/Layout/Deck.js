import React, { useState, useEffect } from "react";
import {
  useParams,
  Route,
  useRouteMatch
} from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";

function Deck() {
  const { deckId } = useParams();

  const { url, path } = useRouteMatch();

  const [currentDeck, setCurrentDeck] = useState({});

  const [cardsArray, setCardsArray] = useState([]);

  function getDeckById(deckId) {
    readDeck(deckId).then((data) => {
      setCurrentDeck(data);

      if (data.cards && data.cards.length > 0) {
        const filteredCards = data.cards.filter((card) => !("cards" in card));
        setCardsArray(filteredCards);
      }
    });
  }

  useEffect(() => {
    getDeckById(deckId);
  }, [deckId]);

  return (
    <>
      <Route exact path={path}>
        <DeckView
          currentDeck={currentDeck}
          cardsArray={cardsArray}
          url={url}
          deckId={deckId}
          getDeckById={getDeckById}
        />
      </Route>

      <Route path={`${path}/edit`}>
        {currentDeck.id && <EditDeck 
        currentDeck={currentDeck} 
        deckId={deckId}
        getDeckById={getDeckById} />}
      </Route>

      <Route path={`${path}/cards/new`}>
        <AddCard
        deckId={deckId}
        currentDeck={currentDeck}
        getDeckById={getDeckById}
        />
      </Route>
    </>
  );
}

export default Deck;
