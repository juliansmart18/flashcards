import React, {useState, useEffect} from "react";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";
import Card from "./Card";

function Deck() {
    const {deckId} = useParams();

    const [currentDeck, setCurrentDeck] = useState({});

    const [cardsArray, setCardsArray] = useState([]);

    function getDeckById(deckId) {
        readDeck(deckId).then((data) => {
          setCurrentDeck(data);
    
          if (data.cards && data.cards.length > 0) {
            const filteredCards = data.cards.filter(
              (card) => !("cards" in card)
            );
            setCardsArray(filteredCards);
          }
        });
      }
    
      useEffect(() => {
        getDeckById(deckId);
      }, [deckId]);

    return (
    <div>
                <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">{currentDeck.name}</li>
      </ol>
    </nav>
    <div>
    <h3>{currentDeck.name}</h3>
    <p>{currentDeck.description}</p>
    <div className="d-flex justify-content-between">
        <div>
            <Link to="#" className="btn btn-secondary m-1">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary m-1">Study</Link>
        <Link to="#" className="btn btn-primary m-1">Add Cards</Link>
        </div>
        <div>
        <button className="btn btn-danger">Delete</button>
        </div>
    </div>
    </div>
    <div>
        <h1 className="pt-4">Cards</h1>
        {cardsArray.map(card=>
            <Card key={card.id} card={card} getDeckById={getDeckById} deckId={deckId} />)}
    </div>
    </div>
    )
}

export default Deck;