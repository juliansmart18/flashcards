import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";
import { createCard } from "../../utils/api";

function AddCard({ deckId, currentDeck, getDeckById, url }) {
  const initialFormState = {
    front: "",
    back: "",
  };

  function handleNewCard(deckId, newCard) {
    createCard(deckId, newCard)
      .then(() => getDeckById(deckId))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="pb-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={url}>{currentDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>

      <h1>{currentDeck.name}: Add Card</h1>

      <CardForm
        initialFormState={initialFormState}
        submitAction={handleNewCard}
        submitButtonText="Save"
        linkText="Done"
        id={deckId}
        url={url}
      />
    </div>
  );
}

export default AddCard;
