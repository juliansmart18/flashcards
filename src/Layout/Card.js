import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard } from "../utils/api";

function Card({ card, getDeckById, deckId }) {

    const handleDeleteClick = () => {
        const confirmDelete = window.confirm(
          "Delete this card?\nYou will not be able to recover it."
        );
    
        if (confirmDelete) {
          deleteCard(card.id)
            .then(() => {
              getDeckById(deckId);
            })
            .catch((error) => {
              console.error("Error deleting deck:", error);
            });
        }
      };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <div className="p-2 w-50">{card.front}</div>
          <div className="p-2 w-50">{card.back}</div>
        </div>
        <div>
            <Link to="#" className="btn btn-secondary">Edit</Link>
            <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
