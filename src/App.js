import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import CharacterList from "./components/CharacterList";
import LocationList from "./components/LocationList";
import EpisodeList from "./components/EpisodeList";
import { CgMenuRound, CgClose } from "react-icons/cg";
import CharacterDetails from "./components/CharacterDetails";
import LocationDetail from "./components/LocationDetail";
import EpisodeDetail from "./components/EpisodeDetail"; // Import the EpisodeDetail component

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <div>
      <Router>
        <nav className={`navbar ${isMenuOpen ? "open" : ""}`}>
          <div className="logo">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Rick and Morty
            </Link>
          </div>
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <CgClose /> : <CgMenuRound />}
          </div>
          <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
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
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/locations" element={<LocationList />} />
          <Route path="/episodes" element={<EpisodeList />} />
          <Route
            path="/character/:characterId"
            element={<CharacterDetails />}
          />{" "}
          {/* New route */}
          <Route path="/location/:locationId" element={<LocationDetail />} />
          <Route path="/episode/:episodeId" element={<EpisodeDetail />} />{" "}
          {/* New route */}
          <Route path="*" element={<CharacterList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
