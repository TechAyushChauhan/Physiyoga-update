import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types"; // Importing the type for FontAwesome icon

// Define the Props interface with types
interface Props {
  icon: IconDefinition; // The icon prop will be of type FontAwesome icon definition
  title: string;         // The title prop will be a string
  description: string;   // The description prop will be a string
}

const InformationCard: React.FC<Props> = (props) => {
  return (
    <div className="info-cards">
      <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={props.icon} />
      </span>
      <p className="info-card-title">{props.title}</p>
      <p className="info-card-description">{props.description}</p>
    </div>
  );
}

export default InformationCard;
