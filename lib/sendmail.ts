import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";



// Configure the transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // Use true for port 465
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

// Render the EJS template
const renderTemplate = async (templateName, data) => {
  try {
    const templatePath = path.resolve(`./lib/mailtemp.ejs`);
    return await ejs.renderFile(templatePath, data);
  } catch (error) {
    console.error("Error rendering template:", error);
    throw new Error("Failed to render email template");
  }
};

// Function to send the email
const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: `"Your Company" <'mynameisayush007@gmail.com'>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Main function to send username and password email
export const sendCredentialsEmail = async (recipient, name, email, password) => {
  const templateData = {
    Rysun_LOGO: "https://example.com/logo.png", // Replace with your logo URL
    NAME: name,
    LINK: "https://example.com/login", // Replace with your login URL
    EMAIL: email,
    PASSWORD: password,
    MAIL_FROM_NAME: "Your Company",
    YEAR: new Date().getFullYear(),
  };

  try {
    const html = await renderTemplate("credentials", templateData);
    await sendMail(recipient, "Your Account Credentials", html);
  } catch (error) {
    console.error("Error in sendCredentialsEmail:", error);
    throw error;
  }
};

// Example usage
(async () => {
  try {
    await sendCredentialsEmail(
      "john.doe@example.com", // Recipient's email
      "John Doe", // Recipient's name
      "john.doe@example.com", // Username
      "securepassword123" // Password
    );
    console.log("Credentials email sent successfully");
  } catch (error) {
    console.error("Failed to send credentials email:", error);
  }
})();
