// Sample data for initial users
const initialUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "editor" },
    { id: 3, name: "Samuel Jackson", email: "samuel@example.com", role: "viewer" },
];

// Sample data for initial roles
const initialRoles = [
    { id: 1, name: "admin", permissions: ["manage_users", "manage_roles", "view_content"] },
    { id: 2, name: "editor", permissions: ["edit_content", "view_content"] },
    { id: 3, name: "viewer", permissions: ["view_content"] },
];

const initialContent = [
    { id: 1, title: "Article 1", content: "This is content for article 1" },
    { id: 2, title: "Article 2", content: "This is content for article 2" },

];



export const mockApi = {
    // Simulate fetching users
    fetchUsers: () => new Promise(resolve => resolve(initialUsers)), // Correct function name here

    // Simulate fetching content 
    fetchContent: () => new Promise(resolve => resolve(initialContent)),

    // Simulate adding new content
    addContent: (newContent) =>
        new Promise((resolve) => {
            const updatedContent = {...newContent, id: Date.now() };
            initialContent.push(updatedContent); // Update the initialContent array
            resolve(updatedContent);
        }),
    // Simulate updating content
    updateContent: (updatedContent) => new Promise(resolve => {
        const contentIndex = initialContent.findIndex(content => content.id === updatedContent.id);
        if (contentIndex !== -1) {
            initialContent[contentIndex] = updatedContent;
            resolve(initialContent);
        } else {
            resolve(initialContent);
        }
    }),


    // Simulate adding a new user
    addUser: (user) => new Promise(resolve => resolve({ id: Date.now(), ...user })),

    updateUser: (updatedUser) => new Promise(resolve => {

        const userIndex = initialUsers.findIndex(user => user.id === updatedUser.id);
        if (userIndex !== -1) {
            initialUsers[userIndex] = updatedUser;
            resolve(initialUsers);
        } else {
            resolve(initialUsers);
        }
    }),

    // Simulate deleting a user
    deleteUser: (id) => new Promise(resolve => resolve({ message: "User deleted" })),

    // Simulate fetching roles
    fetchRoles: () => new Promise(resolve => resolve(initialRoles)),

    // Simulate adding a new role
    addRole: (role) => new Promise(resolve => resolve({ id: Date.now(), ...role })),

    // Simulate updating roles 
    updateRolePermissions: (roleId, permissions) => new Promise(resolve => {
        const updatedRoles = initialRoles.map(role => {
            if (role.id === roleId) {
                return {...role, permissions };
            }
            return role;
        });
        resolve(updatedRoles);
    }),
};