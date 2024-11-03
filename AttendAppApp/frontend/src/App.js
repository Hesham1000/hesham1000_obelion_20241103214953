import React from 'react';
import RegistrationForm from './src/components/RegistrationForm/RegistrationForm.js';
import LoginForm from './src/components/LoginForm/LoginForm.js';
import EventCreationForm from './src/components/EventCreationForm/EventCreationForm.js';
import VenueList from './src/components/VenueList/VenueList.js';
import SupplierDisplay from './src/components/SupplierDisplay/SupplierDisplay.js';

function App() {
  return (
    <div>
      <h1>Welcome to the Event Management App</h1>
      <RegistrationForm />
      <LoginForm />
      <EventCreationForm />
      <VenueList />
      <SupplierDisplay />
    </div>
  );
}

export default App;
