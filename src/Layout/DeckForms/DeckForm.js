import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function DeckForm({ initialFormState, submitAction }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    submitAction(formData);
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Deck Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            placeholder="Brief description of the deck"
            onChange={handleChange}
            value={formData.description}
          />
        </div>
        <div>
          <Link to="/" className="btn btn-secondary m-1">
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary m-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeckForm;
