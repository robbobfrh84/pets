import { useEffect, useState } from 'react';
import Toys from './Toys'

const base_url = "http://localhost:3000/";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [selectedPet, setSelectedPet] = useState(null); 

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(`${base_url}pets`);
      const data = await response.json();
      setPets(data.pets || []);
    } catch (error) {
      console.error('Failed to fetch pets:', error.message);
    }
  };

  const createPet = async () => {
    try {
      await fetch(`${base_url}pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type })
      });
      fetchPets();
    } catch (err) {
      console.error('Failed to create pet:', err.message);
    }
  };

  const deletePet = async (id) => {
    try {
      await fetch(`${base_url}pets/${id}`, { method: 'DELETE' });
      fetchPets();
    } catch (err) {
      console.error('Failed to delete pet:', err.message);
    }
  };

  const viewToys = async (id) => {
    try {
      const res = await fetch(`${base_url}pets/${id}`);
      const data = await res.json();
      setSelectedPet(data.pet); // assumes backend returns { pet: { ... } }
    } catch (err) {
      console.error('Failed to fetch pet details:', err.message);
    }
  };


  return (
    <div>

      {!selectedPet && (
        <section className={selectedPet ? 'hide' : ''}>
          <div>
            <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
            <input placeholder="Type" value={type} onChange={e => setType(e.target.value)} />
            <button onClick={createPet}>Create Pet</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {pets.map(pet => (
              <div className={"petContainer"}
                key={pet.pet_id}
              >
                <div>
                  <strong>{pet.name}</strong> – {pet.type}
                </div>
                <div>
                  <button onClick={() => viewToys(pet.pet_id)}>🦴</button>
                  <button onClick={() => deletePet(pet.pet_id)}>❌</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedPet && (
        <section>
          <Toys 
            goBack={() => setSelectedPet(null)} 
            pet={selectedPet} 
            viewToys={viewToys}
          />
        </section>
      )}

    </div>
  );
};

export default Pets;
