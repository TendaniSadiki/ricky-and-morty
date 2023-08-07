import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import './EpisodeList.css'; // Import your CSS file for styling

const EpisodeList = () => {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEpisodes();
  }, [currentPage]);

  const fetchEpisodes = () => {
    axios.get(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
      .then(response => {
        setEpisodes(prevEpisodes => [...prevEpisodes, ...response.data.results]);
        setTotalPages(response.data.info.pages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
        setIsLoading(false);
      });
  };

  const handlePageClick = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      setCurrentPage(nextPage);
    }
  };

  return (
    <div className="episode-list">
      <h2>Episode List</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <ul>
            {episodes.map(episode => (
              <li key={episode.id}>
                <h3>{episode.name}</h3>
                <p>Air Date: {episode.air_date}</p>
                <p>Episode: {episode.episode}</p>
                <Link to={`/episode/${episode.id}`}>View Details</Link>
              </li>
            ))}
          </ul>
          <div className="pagination">
            <button
              className="view-more-button"
              onClick={handlePageClick}
              disabled={currentPage >= totalPages}
            >
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeList;
