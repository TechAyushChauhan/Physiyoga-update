import React from "react";
import DoctorCard from "./Helper/DoctorCard";
import "./Styles/SixthPage.css";

// Define the Doctor interface for TypeScript
interface Doctor {
  name: string;
  title: string;
  stars: string;
  reviews: string;
}

const SixthPage: React.FC = () => {
  const doctorsData: Doctor[] = [
    {
      name: "Dr. Kathryn Murphy",
      title: "General Surgeons",
      stars: "4.9",
      reviews: "1800",
    },
    {
      name: "Dr. Jacob Jones",
      title: "Hematologists",
      stars: "4.8",
      reviews: "700",
    },
    {
      name: "Dr. Jenny Wilson",
      title: "Endocrinologists",
      stars: "4.7",
      reviews: "450",
    },
    {
      name: "Dr. Albert Flores",
      title: "Hematologists",
      stars: "4.8",
      reviews: "500",
    },
  ];

  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span className="text-description">Our Programs</span>
        </h3>

        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className="dt-cards-content">
        {doctorsData.map((doctor, index) => (
          <DoctorCard
            key={index}
            img={
              "https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
            }
            name={doctor.name}
            title={doctor.title}
            stars={doctor.stars}
            reviews={doctor.reviews}
          />
        ))}
      </div>
    </div>
  );
};

export default SixthPage;
