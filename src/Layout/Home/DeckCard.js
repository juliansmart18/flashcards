import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck } from "../../utils/api";

function DeckCard({ deck, fetchDecks }) {
  const [cardsArray, setCardsArray] = useState([]);

  useEffect(() => {
    if (deck.cards && deck.cards.length > 0) {
      const filteredCards = deck.cards.filter((card) => !("cards" in card));
      setCardsArray(filteredCards);
    }
  }, [deck]);

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Delete deck?\nYou will not be able to recover it."
    );

    if (confirmDelete) {
      deleteDeck(deck.id)
        .then(() => {
          fetchDecks();
        })
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  return (
    <div key={deck.id} className="card mt-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div>
            <h3 className="card-title">{deck.name}</h3>
          </div>
          <div>
            <h4 className="card-title">{cardsArray.length} cards</h4>
          </div>
        </div>

        <p className="card-text">{deck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-1">
              View
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary m-1"
            >
              Study
            </Link>
          </div>
          <div>
            <button onClick={handleDeleteClick} className="btn btn-danger m-1">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeckCard;
