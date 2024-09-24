import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const Accounts = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('userRegistrationData')) || [];
    setUsers(storedUsers);
  }, []);
  const handleView = (user) => {
    setSelectedUser(user);
    const modal = new window.bootstrap.Modal(document.getElementById('userDetailsModal'));
    modal.show();
  };
  const handleEdit = (user) => {
    setEditingUser(user);
    setEditedData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
    const modal = new window.bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
  };
  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };
  const saveEdit = () => {
    const updatedUsers = users.map(user => 
      user.email === editingUser.email ? { ...user, ...editedData } : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('userRegistrationData', JSON.stringify(updatedUsers));
    
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    modal.hide();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Registered Users</h2>
      {users.length === 0 ? (
        <p className="text-center">No registered users found.</p>
      ) : (
        <table className="table table-striped mt-4">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    className="btn btn-link" 
                    onClick={() => handleView(user)} 
                    title="View User"
                  >
                    <FontAwesomeIcon icon={faEye} color="#007bff" />
                  </button>
                  <button 
                    className="btn btn-link" 
                    onClick={() => handleEdit(user)} 
                    title="Edit User"
                  >
                    <FontAwesomeIcon icon={faEdit} color="#28a745" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="modal fade" id="userDetailsModal" tabIndex="-1" aria-labelledby="userDetailsModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userDetailsModalLabel">User Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {selectedUser ? (
                <div>
                  <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                  <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                </div>
              ) : (
                <p>No user selected.</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      
      <div className="modal fade" id="editUserModal" tabIndex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editUserModalLabel">Edit User Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={editedData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={editedData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editedData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary" onClick={saveEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
