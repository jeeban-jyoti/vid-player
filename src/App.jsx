import React, { useState } from "react";
import "./index.css";

export default function App() {
  // Read query params safely
  const params = new URLSearchParams(window.location.search);
  const fileParam = params.get("file"); // can be comma-separated IDs

  // Extract all file IDs
  const extractFileIds = (param) => {
    if (!param) return [];
    // Handle both full links and raw IDs
    return param.split(",").map((item) => {
      const match = item.match(/\/d\/([^/]+)\//); // full link
      if (match) return match[1];
      return item.trim(); // assume it's already an ID
    });
  };

  const fileIds = extractFileIds(fileParam);

  // State: current playing video
  const [currentFileId, setCurrentFileId] = useState(fileIds[0] || null);

  const buildEmbedUrl = (id) =>
    `https://drive.google.com/file/d/${id}/preview`;

  const buildThumbnailUrl = (id) =>
    `https://drive.google.com/thumbnail?id=${id}`;

  return (
    <div className="video-container">
  {/* Main video */}
  <div className="video-wrapper">
    <iframe
      src={buildEmbedUrl(currentFileId)}
      allow="autoplay; fullscreen"
      allowFullScreen
      title="Google Drive Video"
    />
  </div>

  {/* Playlist thumbnails */}
  <div className="playlist">
    {fileIds.map((id, idx) => (
      <div
        key={id}
        className={`playlist-item ${id === currentFileId ? "active" : ""}`}
        onClick={() => setCurrentFileId(id)}
      >
        <img
          src={buildThumbnailUrl(id)}
          alt={`Video ${idx + 1}`}
          className="thumbnail"
        />
        <p>Video {idx + 1}</p>
      </div>
    ))}
  </div>
</div>
  );
}