import React, { useState } from 'react';
import './SupplierDisplay.css';
import axios from 'axios';

const SupplierDisplay = () => {
  const [step, setStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    venue: '',
    catering: '',
    suppliers: [],
  });

  const handleNextStep = async () => {
    if (step === 4) {
      try {
        await axios.post('https://SupplierDisplay.js-backend.cloud-stacks.com/api/events', eventDetails, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // Redirect to dashboard or success page
        window.location.href = '/dashboard';
      } catch (error) {
        alert('Failed to create event');
      }
    } else {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSupplierSelection = (supplier) => {
    setEventDetails({
      ...eventDetails,
      suppliers: [...eventDetails.suppliers, supplier],
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Event Name"
              value={eventDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleInputChange}
            />
            <button onClick={handleNextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            <select
              name="venue"
              value={eventDetails.venue}
              onChange={handleInputChange}
            >
              <option value="">Select Venue</option>
              <option value="Venue 1">Venue 1</option>
              <option value="Venue 2">Venue 2</option>
            </select>
            <button onClick={handlePrevStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div>
            <select
              name="catering"
              value={eventDetails.catering}
              onChange={handleInputChange}
            >
              <option value="">Select Catering</option>
              <option value="Catering 1">Catering 1</option>
              <option value="Catering 2">Catering 2</option>
            </select>
            <button onClick={handlePrevStep}>Back</button>
            <button onClick={handleNextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div>
            <button onClick={() => handleSupplierSelection('Supplier 1')}>
              Select Supplier 1
            </button>
            <button onClick={() => handleSupplierSelection('Supplier 2')}>
              Select Supplier 2
            </button>
            <button onClick={handlePrevStep}>Back</button>
            <button onClick={handleNextStep}>Finish</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="supplier-display">{renderStepContent()}</div>;
};

export default SupplierDisplay;
