import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const history = useHistory();

  const [currentDeck, setCurrentDeck] = useState({});

  const [cardsArray, setCardsArray] = useState([]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [isFront, setIsFront] = useState(true);
  

  useEffect(() => {
    readDeck(deckId).then((data) => {
      setCurrentDeck(data);

      if (data.cards && data.cards.length > 0) {
        const filteredCards = data.cards.filter(
          (card) => !("cards" in card)
        );
        setCardsArray(filteredCards);
      }
    });
  }, [deckId]);

  function toggleCard() {
    setIsFront(!isFront);
  }

  function nextCard() {
    if (currentCardIndex < cardsArray.length - 1) {
      // If it's not the last card, increment the card index
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      // Reset to front when moving to the next card
      setIsFront(true);
    } else {
      // It's the last card, show confirmation dialog
      const shouldRestart = window.confirm(
        "Restart Cards?\nClick 'cancel' to return to the home page."
      );

      if (shouldRestart) {
        // Reset the card index to start over
        setCurrentCardIndex(0);
        // Reset to the front of the card
        setIsFront(true);
      } else {
        // Navigate back to the home screen
        history.push("/");
      }
    }
  }
  
  const currentCard = cardsArray[currentCardIndex] || {};


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

    {cardsArray.length < 3 ? (
      <div>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cardsArray.length} cards in this deck.</p>
        <Link className="btn btn-primary" to="#">Add Cards</Link>
      </div>
    ) : (
      <>
        <div className="card">
          <h4 className="card-title">
            Card {currentCardIndex + 1} of {cardsArray.length}
          </h4>
          <p className="card-text">
            {isFront ? currentCard.front : currentCard.back}
          </p>
          <div>
            <button onClick={toggleCard} className="btn btn-secondary">
              Flip
            </button>
            {!isFront && (
              <button onClick={nextCard} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      </>
    )}
  </div>
  );
}

export default Study;
