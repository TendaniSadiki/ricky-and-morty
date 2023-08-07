// EpisodeDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import './EpisodeDetail.css'; // Import your CSS file for styling

const EpisodeDetail = () => {
  const { episodeId } = useParams();
  const [episode, setEpisode] = useState({});
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEpisode();
  }, []);

  const fetchEpisode = () => {
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then(response => {
        setEpisode(response.data);
        fetchCharacters(response.data.characters);
      })
      .catch(error => {
        console.error('Error fetching episode:', error);
        setIsLoading(false);
      });
  };

  const fetchCharacters = (characterUrls) => {
    const characterPromises = characterUrls.map(url => axios.get(url));
    Promise.all(characterPromises)
      .then(responses => {
        const charactersData = responses.map(response => response.data);
        setCharacters(charactersData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="episode-detail">
      <h2>Episode Details</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h3>{episode.name}</h3>
          <p>Air Date: {episode.air_date}</p>
          <p>Episode: {episode.episode}</p>
          <h3>Characters:</h3>
          <ul className="characters-list">
            {characters.map(character => (
              <li key={character.id} className="character-item">
                <Link to={`/character/${character.id}`} className="character-link">
                  <img src={character.image} alt={`${character.name} character`} className="character-image" />
                  <p className="character-name">{character.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EpisodeDetail;
