import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterList.css'; // Import your CSS file for styling
import { CgClose, CgSearch } from 'react-icons/cg'; // Import the CgSearch icon
import Loader from './Loader/Loader';
import { Link } from 'react-router-dom';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchActive, setSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const fetchCharacters = () => {
    axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then(response => {
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
        setIsLoading(false);
      });
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    if (!searchActive) {
      setSearchResults([]);
    }
  };

  const searchCharacters = (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filteredCharacters = characters.filter(
      (character) => character.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredCharacters);
  };

  const getPageNumbers = () => {
    const pagesToShow = 10; // Show up to 10 page numbers at a time
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div>
      <h2>Rick and Morty Characters</h2>
      <div className='search-icon'>
        <button onClick={toggleSearch}>
          {searchActive ? <CgClose /> : <CgSearch />}
        </button>
      </div>
      {isLoading && <Loader />}
      {searchActive && (
        <div className="search-dropdown">
          <input
            type="text"
            placeholder="Search characters..."
            onChange={(e) => searchCharacters(e.target.value)}
            className="search-input"
          />
          <ul>
            {searchResults.map((result) => (
              <li key={result.id}>
                <img src={result.image} alt={`${result.name} character`} className="search-result-image" />
                <p>{result.name}</p>
                <Link to={`/character/${result.id}`}>View Details</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="character-grid">
        {characters.map(character => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={`${character.name} character`} />
            <p>{character.name}</p>
            <Link to={`/character/${character.id}`}>View Details</Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <ul className="page-numbers">
          {getPageNumbers().map((pageNumber) => (
            <li
              key={pageNumber}
              className={pageNumber === currentPage ? 'active' : ''}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterList;
