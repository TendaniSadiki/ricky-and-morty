import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import './CharacterDetails.css'; // Import your CSS file for styling
import { CgShare } from 'react-icons/cg'; // Import the CgShare icon

const CharacterDetails = () => {
  const { characterId } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCharacterDetails();
  }, [characterId]);

  const fetchCharacterDetails = () => {
    setIsLoading(true);
    axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(response => {
        setCharacterDetails(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching character details:', error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div><Loader/></div>;
  }

  if (!characterDetails) {
    return <div>Character not found.</div>;
  }

  const characterStatusClass = characterDetails.status.toLowerCase();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: characterDetails.name,
        text: `Check out ${characterDetails.name} from Rick and Morty!`,
        url: window.location.href
      });
    } else {
      alert(`Share ${characterDetails.name} via other methods`);
    }
  };

  return (
    <div className="character-details">
      <h2 className={`character-name ${characterStatusClass}`}>
        {characterDetails.name}
      </h2>
      <p className={`character-status ${characterStatusClass}`}>
        Status: <span>{characterDetails.status}</span>
      </p>
      <p className="character-species">Species: {characterDetails.species}</p>
      <p className="character-gender">Gender: {characterDetails.gender}</p>
      <p className="character-origin">Origin: {characterDetails.origin.name}</p>
      <img
        src={characterDetails.image}
        alt={`${characterDetails.name} character`}
        className="character-image"
      />
      <CgShare className="share-icon" onClick={handleShare} />
    </div>
  );
};

export default CharacterDetails;
