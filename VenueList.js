import React, { useState, useEffect } from 'react';
import './VenueList.css';
import axios from 'axios';

const VenueList = ({ onSelectVenue }) => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('https://VenueList.js-backend.cloud-stacks.com/api/events');
        setVenues(response.data);
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };
    fetchVenues();
  }, []);

  const handleVenueSelect = async (venue) => {
    setSelectedVenue(venue);
    onSelectVenue(venue);
    try {
      await axios.put(`https://VenueList.js-backend.cloud-stacks.com/api/events/${venue.id}`, {
        ...venue,
        selected: true,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating venue selection:', error);
    }
  };

  return (
    <div className="venue-list-container">
      <h2>Select a Venue</h2>
      <div className="venue-list">
        {venues.map((venue) => (
          <div
            key={venue.id}
            className={`venue-item ${selectedVenue && selectedVenue.id === venue.id ? 'selected' : ''}`}
            onClick={() => handleVenueSelect(venue)}
          >
            <img src={venue.image} alt={venue.name} className="venue-image" />
            <div className="venue-details">
              <h3>{venue.name}</h3>
              <p>{venue.location}</p>
              <p>{venue.capacity} people</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueList;
