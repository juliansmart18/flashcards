import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck } from "../utils/api";

function DeckCard({deck, fetchDecks}) {

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
    <div key={deck.id} className="card">
        <div className="card-body">

        <h3 className="card-title">{deck.name}</h3>
        <h4 className="card-title">{cardsArray.length} Cards</h4>

        <p className="card-text">{deck.description}</p>

        <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>

        <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>

        </div>
    </div>
    )
}

export default DeckCard;