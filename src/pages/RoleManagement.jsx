import React, { useState } from "react";

const mockApi = {
  addRole: (role) =>
    new Promise((resolve) => resolve({ id: Date.now(), ...role })),
  updateRolePermissions: (roleId, permissions) =>
    new Promise((resolve) => {
      const updatedRoles = initialRoles.map((role) => {
        if (role.id === roleId) {
          return { ...role, permissions };
        }
        return role;
      });
      resolve(updatedRoles);
    }),
};

const initialRoles = [
  { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
  { id: 2, name: "Editor", permissions: ["read", "write"] },
  { id: 3, name: "Viewer", permissions: ["read"] },
];

const initialPermissions = ["read", "write", "delete"];

const RoleManagement = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ name: "", permissions: [] });

  const handleAddRole = () => {
    mockApi.addRole(newRole).then((newRoleData) => {
      setRoles([...roles, newRoleData]);
      setNewRole({ name: "", permissions: [] });
    });
  };

  const handlePermissionToggle = (roleId, permission) => {
    const updatedPermissions = roles.map((role) => {
      if (role.id === roleId) {
        const permissions = role.permissions.includes(permission)
          ? role.permissions.filter((p) => p !== permission)
          : [...role.permissions, permission];
        return { ...role, permissions };
      }
      return role;
    });

    mockApi
      .updateRolePermissions(
        roleId,
        updatedPermissions.find((role) => role.id === roleId).permissions
      )
      .then((updatedRoles) => setRoles(updatedRoles));
  };

  return (
    <div className="role-management">
      <h2>Manage Roles</h2>

      <div className="add-role-form">
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
        />
        <div>
          {initialPermissions.map((permission) => (
            <label key={permission}>
              <input
                type="checkbox"
                checked={newRole.permissions.includes(permission)}
                onChange={() =>
                  setNewRole({
                    ...newRole,
                    permissions: newRole.permissions.includes(permission)
                      ? newRole.permissions.filter((p) => p !== permission)
                      : [...newRole.permissions, permission],
                  })
                }
              />
              {permission.charAt(0).toUpperCase() + permission.slice(1)}
            </label>
          ))}
        </div>
        <button onClick={handleAddRole}>Add Role</button>
      </div>

      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            <span>{role.name}</span>
            <div>
              <strong>Permissions: </strong>
              {role.permissions.join(", ")}
            </div>
            <div>
              {initialPermissions.map((permission) => (
                <button
                  key={permission}
                  onClick={() => handlePermissionToggle(role.id, permission)}
                >
                  Toggle{" "}
                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleManagement;
