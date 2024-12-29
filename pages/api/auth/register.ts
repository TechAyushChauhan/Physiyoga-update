import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../models/login';
import { connectToDatabase } from '../../../lib/mongodb';
import ejs from 'ejs';
import path from 'path';
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'xxasd7885[';

const generateReferralCode = (email: string) => {
  const uniquePart = crypto.randomBytes(4).toString('hex'); 
  return `${email.split('@')[0]}-${uniquePart}`.toUpperCase(); 
};

const renderTemplate = async (data: object) => {
  try {
    const templatePath = path.resolve(`./lib/template/register.ejs`);
    return await ejs.renderFile(templatePath, data);
  } catch (error) {
    console.error("Error rendering template:", error);
    throw new Error("Failed to render email template");
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();
    try {
      const { mobileOrEmail } = req.body;

      const existingUser = await db.collection<User>('users').findOne({ mobileOrEmail });

      if (existingUser) {
        return res.status(201).json({
          "type": "E",
          "msg": "User already exists"
        });
      }

      const referralCode = generateReferralCode(mobileOrEmail);

      const templateData = {
        NAME: "ayush",
        EMAIL: `${mobileOrEmail}`,
        LINK: "https://physiyoga-test.netlify.app/login",
        REFERRAL_CODE: referralCode,
      };

      const token = jwt.sign(
        { username: mobileOrEmail },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      const html = await renderTemplate(templateData);

      const auth = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
          user: "mynameisayush008@gmail.com",
          pass: "ftyk hlvt jvll avau"
        }
      });

      const receiver = {
        from: "mynameisayush008@gmail.com",
        to: `${mobileOrEmail}`,
        subject: 'physiyoga-login',
        html: html,
      };

      // const sendEmailPromise = new Promise<void>((resolve, reject) => {
      //   auth.sendMail(receiver, (error) => {
      //     if (error) {
      //       reject(error);
      //     } else {
      //       resolve();
      //     }
      //   });
      // });

      // await sendEmailPromise;

      const saveUser = await db.collection<User>('users').insertOne({
        ...req.body,
        referralCode,
      });

      console.log(saveUser);

      return res.status(201).json({
        "type": "S",
        "msg": "User registered successfully",
        "token": token,
        "referralCode": referralCode
      });
    } catch (error) {
      console.log(error);

      return res.status(500).send({ msg: 'Server error', error });
    }
  } else {
    return res.status(405).json({ msg: 'Method Not Allowed' });
  }
};

export default handler;
