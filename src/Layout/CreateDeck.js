import React from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateDeck() {
    // const history = useHistory();


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

        <form>
  <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" placeholder="Deck Name" />
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea className="form-control" id="description" placeholder="Brief description of the deck" />
  </div>
    </form>
    <div>
        <Link to="/" className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
    </div>

    </div>
    )
}

export default CreateDeck;