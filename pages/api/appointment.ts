import { ObjectId } from 'mongodb';
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
      const {
        name, gender, birthdate, mobileNumber, email, address, city, state, pincode,
        appointmentDate, appointmentTime, howDidYouHear, referrer, medicalHistory,
        physicianContactNo, currentMedications, medicineAllergy,
      } = req.body;

 

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
