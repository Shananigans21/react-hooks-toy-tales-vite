// src/App.jsx
import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((r) => r.json())
      .then(setToys);
  }, []);

  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }

  function handleDeleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  return (
    <div>
      <div id="toy-header">
        <img
          alt="toy header"
          src="https://fontmeme.com/permalink/180719/67429e6afec53d21d64643101c43f029.png"
        />
      </div>
      <div className="buttonContainer">
        <button onClick={() => setShowForm((prev) => !prev)}>Add a Toy</button>
      </div>
      {showForm && <ToyForm onAddToy={handleAddToy} />}
      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onLike={handleUpdateToy}
            onDelete={handleDeleteToy}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
