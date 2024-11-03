import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VenueManagement.css';

const VenueManagement = () => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('https://AttendAppApp-backend.cloud-stacks.com/api/venues');
        setVenues(response.data);
      } catch (err) {
        setError('Failed to fetch venues');
      }
    };

    fetchVenues();
  }, []);

  const handleBookingRequest = async (venueId) => {
    try {
      // Logic to handle booking request
    } catch (err) {
      setError('Booking request failed');
    }
  };

  return (
    <div className="venue-management">
      {error && <p className="error">{error}</p>}
      {venues.map((venue) => (
        <div className="venue-card" key={venue.id}>
          <h2>{venue.name}</h2>
          <div className="venue-photos">
            {venue.photos.map((photo, index) => (
              <img src={photo} alt={`${venue.name} ${index}`} key={index} />
            ))}
          </div>
          <p>Capacity: {venue.capacity}</p>
          <p>Amenities: {venue.amenities.join(', ')}</p>
          <p>Pricing: {venue.pricing}</p>
          <button onClick={() => handleBookingRequest(venue.id)}>Request Booking</button>
          <div className="venue-reviews">
            <h3>Customer Reviews</h3>
            {venue.reviews.map((review, index) => (
              <div className="review" key={index}>
                <p>{review.user}: {review.comment} ({review.rating} stars)</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VenueManagement;
