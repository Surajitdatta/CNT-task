import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Accounts from './components/Accounts';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <div>
        {/* Navigation Header */}
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid d-flex justify-content-between">
            <Link className="navbar-brand" to="/">Assignment</Link>
            <div className="d-flex gap-3"> {/* Added gap class here */}
              <Link className="nav-link" to="/">Registration</Link>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/accounts">User Details</Link>
            </div>
          </div>
        </nav>

        {/* Routes for the different pages */}
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/accounts" element={<Accounts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
