import React from "react";
import Image from "next/image"; // For image optimization in Next.js
import SolutionStep from "./Helper/SolutionStep";
import "./Styles/ThirdPage.css";

// Define types for the component (if needed, for example, SolutionStep props)
const Thirdpage: React.FC = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
          <Image
            className="hero-image"
            src="https://png.pngtree.com/png-vector/20230928/ourmid/pngtree-young-afro-professional-doctor-png-image_10148632.png"
            alt="Doctor"
            width={500} // Add width and height
            height={500} // Add width and height
          />
        </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span className="text-description">About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Health Plus, your trusted partner for accessible and
          personalized healthcare. Our expert doctors offer online consultations
          and specialized services, prioritizing your well-being. Join us on
          this journey towards a healthier you.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        {/* Use SolutionStep component */}
        <SolutionStep
          title="Choose a Specialist"
          description="Find your perfect specialist and book with ease at Health Plus. Expert doctors prioritize your health, offering tailored care."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </div>
    </div>
  );
}

export default Thirdpage;
