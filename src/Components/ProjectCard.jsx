// ProjectCard.js
import React from "react";

const ProjectCard = ({ title, thumbnailUrl, selected, onClick }) => {
  return (
    <div className={`px-2 project-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <img src={thumbnailUrl} alt={title} />
      <h3>{title}</h3>
    </div>
  );
};

export default ProjectCard;