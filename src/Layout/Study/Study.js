import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";

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
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsFront(true);
    } else {
      const shouldRestart = window.confirm(
        "Restart Cards?\nClick 'cancel' to return to the home page."
      );

      if (shouldRestart) {
        setCurrentCardIndex(0);
        setIsFront(true);
      } else {
        history.push("/");
      }
    }
  }
  
  const currentCard = cardsArray[currentCardIndex] || {};


  return (
    <div className="pb-3">
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
      <NotEnoughCards cardsArray={cardsArray} deckId={deckId} />
    ) : (
      <>
        <div className="card p-4">
          <h4 className="card-title">
            Card {currentCardIndex + 1} of {cardsArray.length}
          </h4>
          <p className="card-text">
            {isFront ? currentCard.front : currentCard.back}
          </p>
          <div>
            <button onClick={toggleCard} className="btn btn-secondary m-1">
              Flip
            </button>
            {!isFront && (
              <button onClick={nextCard} className="btn btn-primary m-1">
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
