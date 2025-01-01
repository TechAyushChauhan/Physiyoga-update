import { ObjectId } from 'mongodb';

// Appointment Interface
export interface Appointment {
    _id?: ObjectId;                  // Unique identifier for the appointment
    name: string;                   // Full name of the person
    gender: string;                 // Gender of the person
    birthdate: string;              // Birthdate in YYYY-MM-DD format
    mobileNumber: string;           // Primary contact number
    alternativeNumber?: string;     // Optional alternative contact number
    email: string;                  // Email ID
    address: string;                // Full address
    city: string;                   // City of residence
    state: string;                  // State of residence
    pincode: string;                // Postal code
    appointmentDate: string;        // Date of the appointment (YYYY-MM-DD)
    appointmentTime: string;        // Time of the appointment (HH:mm)
    howDidYouHear: string;          // How the person heard about the service
    referrer?: {
        name: string;               // Name of the person who referred
        contactNo: string;          // Contact number of the referrer
    };
    medicalHistory: {
        heartDisease: boolean;
        diabetes: boolean;
        highBloodPressure: boolean;
        asthma: boolean;
        epilepsy: boolean;
        allergy: boolean;
        pregnancy: boolean;
        tuberculosis: boolean;
        thyroidDisease: boolean;
        hepatitis: boolean;
        liverKidneyDisease: boolean;
        cancer: boolean;
        none: boolean;
        others?: string;            // Additional medical history details
    };
    physicianContactNo?: string;    // Contact number of the physician
    currentMedications: {
        diabetes: boolean;
        highBloodPressure: boolean;
        acidity: boolean;
        bloodThinners: boolean;
        arthritis: boolean;
        vitaminsMinerals: boolean;
        none: boolean;
        others?: string;            // Additional medications
    };
    medicineAllergy: {
        allergic: boolean;          // Whether the person is allergic to any medicine
        details?: string;           // Details of the allergy if any
    };
}