import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const x = useNavigate()
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('userRegistrationData')) || [];
    const userFound = users.some(user => user.email === loginData.email && user.password === loginData.password);

    if (userFound) {
      alert('Login Successful!');
      x("/accounts")
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login Form</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
