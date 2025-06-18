import { useState } from 'react';

const base_url = "http://localhost:3000/";

const Toys = ({ pet, goBack, viewToys }) => {
  const [toyName, setToyName] = useState('');

  const createToy = async () => {
    try {
      const response = await fetch(`${base_url}pets/${pet.pet_id}/toys`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: toyName, likes: false })
      });
      viewToys(pet.pet_id); // 👈 refresh the pet
    } catch (err) {
      console.error('Error creating toy:', err.message);
    }
  };

  const toggleLike = async (toy) => {
    try {
      const response = await fetch(`${base_url}toys/${toy.toy_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: !toy.likes })
      });    
      viewToys(pet.pet_id); // 👈 refresh the pet
    } catch (err) {
      console.error('Error toggling like:', err.message);
    }
  };

  const deleteToy = async (toyId) => {
    try {
      const res = await fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'DELETE'
      });
      viewToys(pet.pet_id); // 👈 refresh the pet
    } catch (err) {
      console.error('Error deleting toy:', err.message);
    }
  };

  return (
    <div className="toys-container">

      <button className="back-button" onClick={goBack}>⬅️ Back to Pets</button>
      <h3>🦴 Toys for "{pet.name} the {pet.type}"</h3>

      <div className="toy-form">
        <input placeholder="Toy" value={toyName} onChange={(e) => setToyName(e.target.value)}/>
        <button onClick={createToy}>Add Toy</button>
      </div>

      <div className="toy-list">
        {pet.toys.length === 0 ? (
          <p>No toys found.</p>
        ) : (
          [...pet.toys]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((toy) => (
            <div className="toy-card" key={toy.toy_id}>
              <div>
                <strong>{toy.name}</strong>
              </div>
              <div>
                <button onClick={() => toggleLike(toy)}>
                  {toy.likes ? '❤️' : '🙄'}
                </button>
                <button onClick={() => deleteToy(toy.toy_id)}>❌</button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Toys;