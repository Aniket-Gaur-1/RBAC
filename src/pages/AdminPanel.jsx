import React, { useState, useEffect } from "react";
import { mockApi } from "./../services/mockApi";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    const savedRoles = JSON.parse(localStorage.getItem("roles"));

    if (savedUsers) {
      setUsers(savedUsers);
    } else {
      mockApi.fetchUsers().then((data) => {
        setUsers(data);
        localStorage.setItem("users", JSON.stringify(data));
      });
    }

    if (savedRoles) {
      setRoles(savedRoles);
    } else {
      mockApi.fetchRoles().then((data) => {
        setRoles(data);
        localStorage.setItem("roles", JSON.stringify(data));
      });
    }
  }, []);

  const handleAddUser = () => {
    mockApi.addUser(newUser).then((newUserData) => {
      const updatedUsers = [...users, newUserData];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setNewUser({ name: "", email: "", role: "" });
    });
  };

  const handleDeleteUser = (userId) => {
    mockApi.deleteUser(userId).then(() => {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
    });
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleSaveEdit = () => {
    if (selectedUser) {
      mockApi.updateUser(selectedUser).then(() => {
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id ? selectedUser : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setSelectedUser(null);
      });
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>
              {user.name} ({user.email})
            </span>
            <span> - Role: {user.role}</span>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="edit-user-form">
          <h3>Edit User</h3>
          <input
            type="text"
            value={selectedUser.name}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, name: e.target.value })
            }
          />
          <input
            type="email"
            value={selectedUser.email}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <select
            value={selectedUser.role}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <button onClick={handleSaveEdit}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
