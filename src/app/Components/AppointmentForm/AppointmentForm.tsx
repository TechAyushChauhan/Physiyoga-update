"use client"; 
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../footer/page";
import Navbar from "../navbar/page";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/AppointmentForm.module.css";

// Define the shape of the form errors
interface FormErrors {
  patientName?: string;
  patientNumber?: string;
  patientGender?: string;
  appointmentTime?: string;
  preferredMode?: string;
}

const AppointmentForm: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // State for form fields
  const [patientName, setPatientName] = useState<string>("");
  const [patientNumber, setPatientNumber] = useState<string>("");
  const [patientGender, setPatientGender] = useState<string>("default");
  const [appointmentTime, setAppointmentTime] = useState<string>("");
  const [preferredMode, setPreferredMode] = useState<string>("default");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form inputs
    const errors: FormErrors = {};
    if (!patientName.trim()) {
      errors.patientName = "Patient name is required";
    } else if (patientName.trim().length < 8) {
      errors.patientName = "Patient name must be at least 8 characters";
    }

    if (!patientNumber.trim()) {
      errors.patientNumber = "Patient phone number is required";
    } else if (patientNumber.trim().length !== 10) {
      errors.patientNumber = "Patient phone number must be 10 digits";
    }

    if (patientGender === "default") {
      errors.patientGender = "Please select patient gender";
    }
    if (!appointmentTime) {
      errors.appointmentTime = "Appointment time is required";
    } else {
      const selectedTime = new Date(appointmentTime).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime <= currentTime) {
        errors.appointmentTime = "Please select a future appointment time";
      }
    }
    if (preferredMode === "default") {
      errors.preferredMode = "Please select a preferred mode";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setPatientName("");
    setPatientNumber("");
    setPatientGender("default");
    setAppointmentTime("");
    setPreferredMode("default");
    setFormErrors({});

    toast.success("Appointment Scheduled!", {
        position: "top-center",
        onOpen: () => setIsSubmitted(true),
        onClose: () => setIsSubmitted(false),
      });
      
  };

  return (
    <div className={styles.appointmentFormSection}>
      <Navbar />
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>
          <span>Book Appointment Online</span>
        </h2>

        <form className={styles.formContent} onSubmit={handleSubmit}>
          <label>
            Patient Full Name:
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
            {formErrors.patientName && <p className={styles.errorMessage}>{formErrors.patientName}</p>}
          </label>

          <label>
            Patient Phone Number:
            <input
              type="text"
              value={patientNumber}
              onChange={(e) => setPatientNumber(e.target.value)}
              required
            />
            {formErrors.patientNumber && <p className={styles.errorMessage}>{formErrors.patientNumber}</p>}
          </label>

          <label>
            Patient Gender:
            <select
              value={patientGender}
              onChange={(e) => setPatientGender(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="private">I will inform Doctor only</option>
            </select>
            {formErrors.patientGender && <p className={styles.errorMessage}>{formErrors.patientGender}</p>}
          </label>

          <label>
            Preferred Appointment Time:
            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              required
            />
            {formErrors.appointmentTime && <p className={styles.errorMessage}>{formErrors.appointmentTime}</p>}
          </label>

          <label>
            Preferred Mode:
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              required
            >
              <option value="default">Select</option>
              <option value="voice">Voice Call</option>
              <option value="video">Video Call</option>
            </select>
            {formErrors.preferredMode && <p className={styles.errorMessage}>{formErrors.preferredMode}</p>}
          </label>

          <button type="submit" className={styles.textAppointmentBtn}>
            Confirm Appointment
          </button>

          {isSubmitted && (
            <p className={styles.successMessage}>
              Appointment details have been sent to the patient’s phone number via SMS.
            </p>
          )}
        </form>
      </div>

      <Footer />
      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
};

export default AppointmentForm;
