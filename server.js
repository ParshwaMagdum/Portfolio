const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: subject || "New Contact Message",
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    res.status(200).json({ message: "Message sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Email failed to send" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
