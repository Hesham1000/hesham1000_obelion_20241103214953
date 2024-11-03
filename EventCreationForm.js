import React, { useState } from 'react';
import './EventCreationForm.css';
import axios from 'axios';

const EventCreationForm = () => {
  const [step, setStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    venue: '',
    catering: '',
    suppliers: [],
  });

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSupplierSelection = (supplier) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      suppliers: prevDetails.suppliers.includes(supplier)
        ? prevDetails.suppliers.filter((s) => s !== supplier)
        : [...prevDetails.suppliers, supplier],
    }));
  };

  const handleEventCreation = async () => {
    try {
      const response = await axios.post(
        'https://EventCreationForm.js-backend.cloud-stacks.com/api/events',
        eventDetails,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Event Created Successfully!');
    } catch (error) {
      alert('Failed to create event');
    }
  };

  return (
    <div className="event-creation-form">
      {step === 1 && (
        <div className="step">
          <h2>Enter Basic Event Details</h2>
          <input
            type="text"
            name="name"
            value={eventDetails.name}
            onChange={handleInputChange}
            placeholder="Event Name"
          />
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
          />
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="step">
          <h2>Select Venue</h2>
          <select
            name="venue"
            value={eventDetails.venue}
            onChange={handleInputChange}
          >
            <option value="">Choose a venue</option>
            <option value="Venue A">Venue A</option>
            <option value="Venue B">Venue B</option>
          </select>
          <button onClick={handlePreviousStep}>Previous</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className="step">
          <h2>Select Catering Options</h2>
          <select
            name="catering"
            value={eventDetails.catering}
            onChange={handleInputChange}
          >
            <option value="">Choose catering</option>
            <option value="Catering A">Catering A</option>
            <option value="Catering B">Catering B</option>
          </select>
          <button onClick={handlePreviousStep}>Previous</button>
          <button onClick={handleNextStep}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div className="step">
          <h2>Select Supplier Services</h2>
          <div className="suppliers">
            {['Supplier A', 'Supplier B', 'Supplier C'].map((supplier) => (
              <div key={supplier}>
                <input
                  type="checkbox"
                  checked={eventDetails.suppliers.includes(supplier)}
                  onChange={() => handleSupplierSelection(supplier)}
                />
                {supplier}
              </div>
            ))}
          </div>
          <button onClick={handlePreviousStep}>Previous</button>
          <button onClick={handleEventCreation}>Finish</button>
        </div>
      )}
    </div>
  );
};

export default EventCreationForm;
