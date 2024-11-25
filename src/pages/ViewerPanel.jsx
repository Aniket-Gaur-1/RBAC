import React, { useState, useEffect } from "react";
import { mockApi } from "./../services/mockApi";

const ViewerPanel = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    mockApi.fetchContent().then((data) => setContent(data));
  }, []);

  return (
    <div className="viewer-panel">
      <h1>Viewer Panel</h1>

      <h3>Content List</h3>
      <ul>
        {content.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewerPanel;
