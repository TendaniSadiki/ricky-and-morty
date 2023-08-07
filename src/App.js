  import React, { useState } from 'react';
  import './App.css';
  import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
  import CharacterList from './components/CharacterList';
  import LocationList from './components/LocationList';
  import EpisodeList from './components/EpisodeList';
  import { CgMenuRound, CgClose } from 'react-icons/cg';

  const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    return (
      <div>
        <Router>
          <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
            <div className="logo">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Rick and Morty
              </Link>
            </div>
            <div className="menu-icon" onClick={toggleMenu}>
              {isMenuOpen ? <CgClose /> : <CgMenuRound />}
            </div>
            <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Characters
                </Link>
              </li>
              <li>
                <Link to="/locations" onClick={() => setIsMenuOpen(false)}>
                  Locations
                </Link>
              </li>
              <li>
                <Link to="/episodes" onClick={() => setIsMenuOpen(false)}>
                  Episodes
                </Link>
              </li>
            </ul>
          </nav>
          <h1>Rick and Morty</h1>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/locations" element={<LocationList />} />
            <Route path="/episodes" element={<EpisodeList />} />
            <Route path="*" element={<CharacterList />} />
          </Routes>
        </Router>
      </div>
    );
  };

  export default App;
