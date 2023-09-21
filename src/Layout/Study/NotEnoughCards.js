import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function NotEnoughCards({cardsArray, deckId}) {
    return (
        <div className="pb-3">
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cardsArray.length} cards in this deck.</p>
        <Link className="btn btn-primary" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
      </div>
    )
}

export default NotEnoughCards;