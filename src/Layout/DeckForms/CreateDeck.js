import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

function CreateDeck() {

    const history = useHistory();

    const initialFormState={
      name: "",
      description: ""
    }
  
    function handleNewDeckSubmit(newDeck) {
      createDeck(newDeck).then(data => history.push(`/decks/${data.id}`));
    }

    return (
        <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
          <h1>Create Deck</h1>

        <DeckForm 
          initialFormState={initialFormState}
          submitAction={handleNewDeckSubmit} />
          </div>
    )
}

export default CreateDeck;