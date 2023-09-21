import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function EditDeck({ currentDeck, deckId, getDeckById }) {

  const history = useHistory();

  function handleEditDeck(updatedDeck) {
    updateDeck(updatedDeck)
      .then(() => {
        return getDeckById(deckId);
      })
      .then(() => {
        history.push(`/decks/${deckId}`);
      })
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
            Edit Deck
          </li>
        </ol>
      </nav>

      <h1>Edit Deck</h1>

      <DeckForm
        initialFormState={currentDeck}
        submitAction={handleEditDeck}
      />
    </div>
  );
}

export default EditDeck;
