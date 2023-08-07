import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterList.css'; // Import your CSS file for styling
import { CgClose } from 'react-icons/cg'; // Import the CgClose icon

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []);

  const openModal = (character) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
      <div className="character-grid">
        {characters.map(character => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={`${character.name} character`} />
            <p>{character.name}</p>
            <button onClick={() => openModal(character)}>View Details</button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCharacter && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              <CgClose />
            </button>
            <h2>{selectedCharacter.name}</h2>
            <p>Status: {selectedCharacter.status}</p>
            <p>Species: {selectedCharacter.species}</p>
            <p>Gender: {selectedCharacter.gender}</p>
            <p>Origin: {selectedCharacter.origin.name}</p>
            <img src={selectedCharacter.image} alt={`${selectedCharacter.name} character`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
