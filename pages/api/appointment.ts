import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from "nodemailer";
import ejs from 'ejs';
import path from 'path';
export const config = {
  api: {
    bodyParser: true, // Enable body parser
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    try {
      // Fetch all appointment times for the specified date
      const appointments = await db.collection('appointments').find({ date: date }, { projection: { time: 1 ,_id :0} }).toArray();
      const times = appointments.map(appointment => appointment.time);
      // Define available times (example)
      const allTimes = [
        '10:00', '10:30', '11:00', '11:30', '12:00',
        '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00',
      ];

    //   const availableTimes = allTimes.filter((time) => !bookedTimes.includes(time));

      res.status(200).json({
        type: 'S',
        message: 'Available times retrieved successfully',
        data: times,
      });
    } catch (err) {
      console.error('Error retrieving available times:', err);
      res.status(500).json({ message: 'Error retrieving available times', error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const {date,time,mobile,
        name, gender, birthdate,altMobile, mobileNumber, email, address, city, state, pincode,medicalInformation,allergy
      ,otherMedicalInformation,medicines ,physiciannumber,othermedicines, appointmentDate, appointmentTime, howDidYouHear, referrer, medicalHistory,
        physicianContactNo, currentMedications, medicineAllergy,
      } = req.body;

 
        
        const renderTemplate = async (data: object) => {
          try {
            const templatePath = path.resolve(`./lib/mailappointmentsuccess.ejs`);
            return await ejs.renderFile(templatePath, data);
          } catch (error) {
            console.error("Error rendering template:", error);
            throw new Error("Failed to render email template");
          }
        };
        const templateData = {
          formData_date:date,
          formData_time:time,
          formData_name:name,
          formData_gender: gender,
          formData_birthdate:birthdate,
          formData_mobile:mobile,
          formData_altMobile : altMobile,
          formData_email:email,
          formData_address:address,
          formData_city:city,
          formData_state:state,
          formData_pincode:pincode,
          formData_medicalInformation:medicalInformation,
          formData_allergy:allergy,
          formData_otherMedicalInformation:otherMedicalInformation,
          formData_medicines:medicines,
          formData_othermedicines:othermedicines,
          formData_physiciannumber:physiciannumber,
        };
        
        const html = await renderTemplate(templateData);
          const receiver = {
        from: "mynameisayush008@gmail.com",
        to: `mynameisayush008@gmail.com`,
        subject: 'new appointment',
        html: html,
      };

      const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "mynameisayush008@gmail.com",
          pass: "ftyk hlvt jvll avau"
        }
      });
       const sendEmailPromise = new Promise<void>((resolve, reject) => {
   auth.sendMail(receiver, (error) => {
     if (error) {
       reject(error);
     } else {
       resolve();
     }
   });
 });

 await sendEmailPromise;
        
            // Insert the new appointment into the database
      const newAppointment = await db.collection('appointments').insertOne(req.body);

      res.status(201).json({
        type: 'S',
        message: 'Appointment added successfully',
        data: newAppointment.insertedId,
      });
    } catch (err) {
      console.error('Error adding appointment:', err);
      res.status(500).json({ message: 'Error adding appointment', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
