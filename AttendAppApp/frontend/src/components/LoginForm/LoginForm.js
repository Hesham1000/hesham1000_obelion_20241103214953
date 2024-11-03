import React, { useState } from 'react';
import './LoginForm.css';
import axios from 'axios';

function LoginForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await axios.post('https://AttendAppApp-backend.cloud-stacks.com/api/auth/login', {
          email: formData.email,
          password: formData.password,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        setMessage('Login successful');
        // Redirect to dashboard or another page
      } else {
        const response = await axios.post('https://AttendAppApp-backend.cloud-stacks.com/api/auth/register', {
          firstName: formData.firstName,
          familyName: formData.familyName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }, {
          headers: { 'Content-Type': 'application/json' }
        });
        setMessage('User registered successfully');
        // Optionally switch to login mode after registration
        setIsLogin(true);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    <div className="login-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="familyName"
              placeholder="Family Name"
              value={formData.familyName}
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={switchMode}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>
      <button className="google-login">Login with Google</button>
    </div>
  );
}

export default LoginForm;
