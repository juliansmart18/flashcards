import React from "react";
import Card from "./Card";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteDeck, listDecks } from "../../utils/api";

function DeckView({currentDeck, cardsArray, url, deckId, getDeckById}) {

  const history = useHistory();

  const handleDeleteClick = () => {
    const confirmDelete = window.confirm(
      "Delete deck?\nYou will not be able to recover it."
    );

    if (confirmDelete) {
      deleteDeck(currentDeck.id)
        .then(() => {
          listDecks();
        })
        .then(()=>{
          history.push("/")
        })
        .catch((error) => {
          console.error("Error deleting deck:", error);
        });
    }
  };

  return (
    <div className="pb-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {currentDeck.name}
          </li>
        </ol>
      </nav>
      <div>
        <h3>{currentDeck.name}</h3>
        <p>{currentDeck.description}</p>
        <div className="d-flex justify-content-between">
          <div>
            <Link to={`${url}/edit`} className="btn btn-secondary m-1">
              Edit
            </Link>
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-1">
              Study
            </Link>
            <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary m-1">
              Add Cards
            </Link>
          </div>
          <div>
            <button onClick={handleDeleteClick} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
      <div>
        <h1 className="pt-4">Cards</h1>
        {cardsArray.map((card) => (
          <Card
            key={card.id}
            card={card}
            getDeckById={getDeckById}
            deckId={deckId}
          />
        ))}
      </div>
    </div>
  );
}

export default DeckView;
