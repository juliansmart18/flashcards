import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DeckCard from "./DeckCard";
import { listDecks } from "../../utils/api";


function DeckList() {

    const [decks, setDecks] = useState([]);

    function fetchDecks() {
     listDecks().then(data => setDecks(data));
    }
    useEffect(fetchDecks, []);

    return <div className="pb-3">
        <Link to="/decks/new" className="btn btn-outline-primary btn-lg m-2">Create Deck</Link>
        {decks.map(deck=>
            <DeckCard key={deck.id} deck={deck} fetchDecks={fetchDecks} />
        )}
    </div>
}

export default DeckList;