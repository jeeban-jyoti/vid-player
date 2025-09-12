import React, { useState } from "react";
import "./index.css";
import AdsterraAd from "./ad"; // import the component

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const fileParam = params.get("file");

  const extractFileIds = (param) => {
    if (!param) return [];
    return param.split(",").map((item) => {
      const match = item.match(/\/d\/([^/]+)\//);
      if (match) return match[1];
      return item.trim();
    });
  };

  const fileIds = extractFileIds(fileParam);
  const [currentFileId, setCurrentFileId] = useState(fileIds[0] || null);

  const buildEmbedUrl = (id) => `https://drive.google.com/file/d/${id}/preview`;
  const buildThumbnailUrl = (id) => `https://drive.google.com/thumbnail?id=${id}`;

  return (
    <div>
      <div className="video-container">
        <div className="video-wrapper">
          <iframe
            src={buildEmbedUrl(currentFileId)}
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Google Drive Video"
          />
        </div>

        <div className="playlist">
          {fileIds.map((id, idx) => (
            <div
              key={id}
              className={`playlist-item ${id === currentFileId ? "active" : ""}`}
              onClick={() => setCurrentFileId(id)}
            >
              <img src={buildThumbnailUrl(id)} alt={`Video ${idx + 1}`} className="thumbnail" />
              <p>Video {idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Insert Adsterra ad here */}
      <div style={{ margin: "40px 0", display: "flex", justifyContent: "center" }}>
        <AdsterraAd />
      </div>
    </div>
  );
}