import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LocationList.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';

const LocationList = () => {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    axios.get('https://rickandmortyapi.com/api/location')
      .then(response => {
        setLocations(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching locations:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="location-list">
      <h2>Location List</h2>
      {isLoading && <Loader/>}
      <ul>
        {locations.map(location => (
          <li key={location.id} className="location-item">
            <h3>{location.name}</h3>
            <p>Type: {location.type}</p>
            <p>Dimension: {location.dimension}</p>
            <Link to={`/location/${location.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationList;
