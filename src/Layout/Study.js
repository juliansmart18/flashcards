import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();

  const [currentDeck, setCurrentDeck] = useState({});

  const [currentCard, setCurrentCard] = useState({});

  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    readDeck(deckId).then((data) => {
      setCurrentDeck(data);

      // Set the currentCard to the front of the first card in the deck
      if (data.cards && data.cards.length > 0) {
        setCurrentCard(data.cards[0]);
      }
    });
  }, [deckId]);

  function toggleCard() {
    setIsFront(!isFront);
  }
  

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
        <h2>Study: {currentDeck.name}</h2>

      <div className="card">
      <h4 className="card-title">Card 1 of 3</h4>
      <p className="card-text">
      {isFront ? currentCard.front : currentCard.back}
    </p>
    <div>

    <button onClick={toggleCard} className="btn btn-secondary">Flip</button>
    {!isFront && <button className="btn btn-primary">Next</button>}

    </div>
      </div>
    </div>
  );
}

export default Study;
