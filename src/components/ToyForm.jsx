// src/components/ToyForm.jsx
import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newToy = {
      name,
      image,
      likes: 0,
    };
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then(onAddToy);

    setName("");
    setImage("");
  }

  return (
    <form className="add-toy-form" onSubmit={handleSubmit}>
      <h3>Create a toy!</h3>
      <input
        type="text"
        name="name"
        placeholder="Enter a toy's name..."
        className="input-text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="image"
        placeholder="Enter a toy's image URL..."
        className="input-text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <br />
      <input
        type="submit"
        name="submit"
        value="Create New Toy"
        className="submit"
      />
    </form>
  );
}

export default ToyForm;
