import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../Styles/SixthPage.css";


// Define the props interface for DoctorCard component
interface DoctorCardProps {
  img: string;
  name: string;
  title: string;
  stars: string;
  reviews: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ img, name, title, stars, reviews }) => {
  return (
    <div className="dt-card">
      {/* Using Next.js Image component for optimized image rendering */}
      <Image src={img} alt={name} width={150} height={150} className="dt-card-img" />
      <p className="dt-card-name text-description">{name}</p>
      <p className="dt-card-title">{title}</p>
      <p className="dt-card-stars">
        <FontAwesomeIcon
          icon={faStar}
          style={{ color: "#F7BB50", paddingRight: "6px" }}
        />
        {stars}
        <span className="dt-card-reviews"> ({reviews}+ Reviews)</span>
      </p>
    </div>
  );
};

export default DoctorCard;
