import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CardForm from "./CardForm";
import { createCard } from "../utils/api";

function AddCard({deckId, currentDeck, getDeckById}) {
    const initialFormState = {
        front: "",
        back: ""
    }

    function handleNewCard(deckId, newCard) {
        createCard(deckId, newCard)
          .then(() => getDeckById(deckId))
          .catch((error) => {
            console.log(error)
          });
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
      deckId={deckId}

      />
    </div>
  );
}

export default AddCard;
