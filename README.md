# Admin Panel with Role-Based Access Control (RBAC)

# Project Overview

This project is an Admin Panel with Role-Based Access Control (RBAC), built using React.js. The project allows admins, editors, and viewers to log in and access different features based on their roles.

# Features

-> Login page with hardcoded credentials for different roles: Admin, Editor, and Viewer.
-> Admin can add, edit, and delete users.
-> Editor can view users and edit their information, but cannot delete them.
-> Viewer can only view users and their details.
-> Simple and clean user interface.

# Technologies Used

-> Frontend: React.js, CSS
-> Mock Authentication: Hardcoded login details for simplicity.
-> State Management: useState and useEffect for data management.

# Roles and Permissions

Admin: Can view, add, edit, and delete users.
Editor: Can view and edit users, but cannot delete users.
Viewer: Can only view users, with no permission to edit or delete.

# Usage

1. Login as Admin, Editor, or Viewer
   On the LoginPage, enter the following credentials:

Admin:
Username: admin
Password: admin123

Editor:
Username: editor
Password: editor123

Viewer:
Username: viewer
Password: viewer123

Depending on the credentials, you will be redirected to the Admin Dashboard where your actions are restricted based on your role:

Admin will have full access to add, edit, and delete users.
Editor will be able to view and edit users but cannot delete them.
Viewer will only be able to view users, with no permissions for editing or deleting.

2. Admin Dashboard

Admin:
Add User: Admin can add new users.
Edit User: Admin can edit existing users.
Delete User: Admin can delete users.

Editor:
Edit User: Editor can modify user details but cannot delete any users.

Viewer:
View User: Viewer can only see the list of users without any editing options.

# Credits

Created by Aniket
Inspired by modern RBAC systems.
