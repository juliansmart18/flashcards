import React, {useState, useEffect} from "react";
import { Link, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";


function EditCard({currentDeck, deckId, getDeckById}) {
    const history = useHistory();

    const {cardId} = useParams();

    const [currentCard, setCurrentCard] = useState({});

    function getCardById(cardId) {
        readCard(cardId).then((data)=> setCurrentCard(data))
    }

    useEffect(()=> {
        getCardById(cardId);
    },[cardId])

    function handleUpdateCard(updatedCard) {
        updateCard(updatedCard)
        .then(() => {
            return getDeckById(deckId);
        })
        .then(() => {
            history.push(`/decks/${deckId}`)
        })
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      
      <h1>Edit Card</h1>

      {currentCard.id && (
        <CardForm
          initialFormState={currentCard}
          submitButtonText="Submit"
          linkText="Cancel"
          submitAction={handleUpdateCard}
        />
    )}

    </div>
    )
}

export default EditCard;