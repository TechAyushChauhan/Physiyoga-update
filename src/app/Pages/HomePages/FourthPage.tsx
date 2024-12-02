import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCalendarCheck } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from "next/router";
import "./Styles/FourthPage.css";

const FourthPage: React.FC = () => {
//   const router = useRouter();

//   const handleBookAppointmentClick = () => {
//     router.push("/appointment");
//   };

  return (
    <div className="ba-section">
      <div className="ba-image-content">
      <Image
            className="ba-image1"
            src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
            alt="Doctor"
            width={500} // Add width and height
            height={500} // Add width and height
          />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span className="text-description">Why Choose Health</span>
        </h3>
        <p className="ba-description">
          Discover the reasons to choose Health Plus for your healthcare needs.
          Experience expert care, convenience, and personalized solutions,
          making your well-being our top priority. Join us on a journey to
          better health and a happier life.
        </p>

        <p className="ba-checks ba-check-first text-description">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Best Professional Doctors
        </p>
        <p className="ba-checks text-description">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Emergency Care
        </p>
        <p className="ba-checks text-description">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> 24/7 Support Live Chat
        </p>
        <p className="ba-checks ba-check-last text-description">
          <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#1E8FFD" }} /> Enrollment Easy and Quick
        </p>

        <button
          className="text-appointment-btn"
          type="button"
        //   onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
        </button>
      </div>
    </div>
  );
};

export default FourthPage;
