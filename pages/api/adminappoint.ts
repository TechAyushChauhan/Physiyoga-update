import { connectToDatabase } from '../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: true, // Enable body parser
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method === 'GET') {
    const { date } = req.query;

    try {
      if (date) {
        // Fetch appointments filtered by date
        const appointments = await db
          .collection('appointments')
          .find({ date }, { projection: { time: 1, _id: 0 } })
          .toArray();

        const times = appointments.map((appointment) => appointment.time);

        res.status(200).json({
          type: 'S',
          message: 'Available times retrieved successfully',
          data: times,
        });
      } else {
        // Fetch all appointments
        const allAppointments = await db
          .collection('appointments')
          .find({})
          .toArray();

        res.status(200).json({
          type: 'S',
          message: 'All appointments retrieved successfully',
          data: allAppointments,
        });
      }
    } catch (err) {
      console.error('Error retrieving appointments:', err);
      res
        .status(500)
        .json({ message: 'Error retrieving appointments', error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        name,
        gender,
        birthdate,
        mobileNumber,
        email,
        address,
        city,
        state,
        pincode,
        appointmentDate,
        appointmentTime,
        howDidYouHear,
        referrer,
        medicalHistory,
        physicianContactNo,
        currentMedications,
        medicineAllergy,
      } = req.body;

      // Validate required fields
      if (!name || !appointmentDate || !appointmentTime) {
        return res.status(400).json({
          message: 'Name, appointment date, and time are required.',
        });
      }

      // Insert the new appointment into the database
      const newAppointment = await db.collection('appointments').insertOne({
        name,
        gender,
        birthdate,
        mobileNumber,
        email,
        address,
        city,
        state,
        pincode,
        appointmentDate,
        appointmentTime,
        howDidYouHear,
        referrer,
        medicalHistory,
        physicianContactNo,
        currentMedications,
        medicineAllergy,
      });

      res.status(201).json({
        type: 'S',
        message: 'Appointment added successfully',
        data: newAppointment.insertedId,
      });
    } catch (err) {
      console.error('Error adding appointment:', err);
      res
        .status(500)
        .json({ message: 'Error adding appointment', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
