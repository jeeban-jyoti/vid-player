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
      {/* Main content row: video + right-side ad */}
      <div className="main-row">
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

        {/* Ad to the right of video+playlist */}
        <script async="async" data-cfasync="false" src="//pl27634790.revenuecpmgate.com/dcc3ebca91bc0aeb8a4dc5a0a9d6da3e/invoke.js"></script>
        <div id="container-dcc3ebca91bc0aeb8a4dc5a0a9d6da3e"></div>
        
      </div>

      {/* Footer ad */}
      <div className="footer-ad">
        <AdsterraAd
            id="ee35760e3e3454fad6da77e64ce83346"
            height={60}
            width={480}
            src="//www.highperformanceformat.com"
          />
      </div>
    </div>
  );
}