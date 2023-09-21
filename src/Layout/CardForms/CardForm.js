import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function CardForm({
  initialFormState,
  submitAction,
  submitButtonText,
  linkText,
  id,
  url,
}) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    id ? submitAction(id, formData) : submitAction(formData);
    setFormData(initialFormState);
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            name="front"
            id="front"
            placeholder="Front side of card"
            onChange={handleChange}
            value={formData.front}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            name="back"
            id="back"
            placeholder="Back side of card"
            onChange={handleChange}
            value={formData.back}
          />
        </div>
        <div>
          <Link to={url} className="btn btn-secondary m-1">
            {linkText}
          </Link>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary m-1"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CardForm;
