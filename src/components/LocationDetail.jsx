import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import { Link } from 'react-router-dom';
import './LocationDetail.css'; // Import your CSS file for styling

const LocationDetail = () => {
  const { locationId } = useParams();
  const [location, setLocation] = useState({});
  const [residents, setResidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${locationId}`)
      .then(response => {
        setLocation(response.data);
        fetchResidents(response.data.residents);
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        setIsLoading(false);
      });
  };

  const fetchResidents = (residentUrls) => {
    const residentPromises = residentUrls.map(url => axios.get(url));
    Promise.all(residentPromises)
      .then(responses => {
        const residentsData = responses.map(response => response.data);
        setResidents(residentsData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching residents:', error);
        setIsLoading(false);
      });
  };

  return (
    <div className="location-detail">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2>{location.name}</h2>
          <p>Type: {location.type}</p>
          <p>Dimension: {location.dimension}</p>
          <h3>Residents:</h3>
          <table className="residents-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {residents.map(resident => (
                <tr key={resident.id}>
                  <td>
                    <Link to={`/character/${resident.id}`} className="resident-name">
                      {resident.name}
                    </Link>
                  </td>
                  <td>
                    <img
                      src={resident.image}
                      alt={`${resident.name} character`}
                      className="resident-image"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LocationDetail;
