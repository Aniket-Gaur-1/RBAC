import React, { useState, useEffect } from "react";
import { mockApi } from "./../services/mockApi";

const EditorPanel = () => {
  const [content, setContent] = useState([]);
  const [newContent, setNewContent] = useState({ title: "", body: "" });
  const [editedContent, setEditedContent] = useState(null);

  useEffect(() => {
    try {
      const savedContent = JSON.parse(localStorage.getItem("content"));

      if (savedContent && Array.isArray(savedContent)) {
        setContent(savedContent);
      } else {
        mockApi
          .fetchContent()
          .then((data) => {
            setContent(data);
            localStorage.setItem("content", JSON.stringify(data));
          })
          .catch((err) => console.error("Error fetching content:", err));
      }
    } catch (err) {
      console.error("Error loading content from localStorage:", err);
    }
  }, []);

  const handleAddContent = () => {
    if (!newContent.title || !newContent.body) {
      alert("Title and Body are required.");
      return;
    }

    mockApi
      .addContent(newContent)
      .then((updatedContent) => {
        const newContentList = [...content, updatedContent]; // Append the new content
        setContent(newContentList);
        localStorage.setItem("content", JSON.stringify(newContentList));
        setNewContent({ title: "", body: "" }); // Reset the form
      })
      .catch((err) => console.error("Error adding content:", err));
  };

  const handleEditContent = (contentId) => {
    const contentToEdit = content.find((item) => item.id === contentId);
    if (contentToEdit) {
      setEditedContent({ ...contentToEdit });
    }
  };

  const handleSaveEdit = () => {
    if (!editedContent.title || !editedContent.body) {
      alert("Title and Body are required.");
      return;
    }

    const updatedContentList = content.map((item) =>
      item.id === editedContent.id ? { ...item, ...editedContent } : item
    );

    setContent(updatedContentList);
    localStorage.setItem("content", JSON.stringify(updatedContentList));
    setEditedContent(null);
  };

  const handleNewContentChange = (e) => {
    const { name, value } = e.target;
    setNewContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const handleEditContentChange = (e) => {
    const { name, value } = e.target;
    setEditedContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  return (
    <div className="editor-panel">
      <h1>Editor Panel</h1>

      <div className="add-content-form">
        <h3>Add New Content</h3>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={newContent.title}
          onChange={handleNewContentChange}
        />
        <textarea
          placeholder="Body"
          name="body"
          value={newContent.body}
          onChange={handleNewContentChange}
        />
        <button type="button" onClick={handleAddContent}>
          Add Content
        </button>
      </div>

      <h3>Content List</h3>
      <ul>
        {content.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <button type="button" onClick={() => handleEditContent(item.id)}>
              Edit
            </button>
          </li>
        ))}
      </ul>

      {editedContent && (
        <div className="edit-content-form">
          <h3>Edit Content</h3>
          <input
            type="text"
            name="title"
            value={editedContent.title}
            onChange={handleEditContentChange}
          />
          <textarea
            name="body"
            value={editedContent.body}
            onChange={handleEditContentChange}
          />
          <button type="button" onClick={handleSaveEdit}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditorPanel;
