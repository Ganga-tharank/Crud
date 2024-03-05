import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    setUsers(response.data);
  };

  const addUser = async () => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/users', {
      name: newUser,
      username: newUser.toLowerCase(),
      email: `${newUser.toLowerCase()}@example.com`,
    });
    setUsers([...users, response.data]);
    setNewUser('');
  };

  const editUserDetails = async () => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, {
      name: editUser.name,
      username: editUser.username,
      email: editUser.email,
    });
    const updatedUsers = users.map(user => (user.id === response.data.id ? response.data : user));
    setUsers(updatedUsers);
    setEditUser(null);
  };

  const deleteUser = async () => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${deleteUserId}`);
    const updatedUsers = users.filter(user => user.id !== deleteUserId);
    setUsers(updatedUsers);
    setDeleteUserId(null);
  };

  return (
    <div className="App">
      <h1>User CRUD</h1>
      <input
        type="text"
        placeholder="New user"
        value={newUser}
        onChange={e => setNewUser(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => setEditUser(user)}>Edit</button>
                <button onClick={() => setDeleteUserId(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <div>
          <input
            type="text"
            placeholder="Edit user"
            value={editUser.name}
            onChange={e => setEditUser({ ...editUser, name: e.target.value })}
          />
          <button onClick={editUserDetails}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default App;
