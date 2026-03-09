const nodemailer = require('nodemailer');

// Unified transporter – using port 587 (STARTTLS)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // only for development
  }
});

const sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: `"Fabrico" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP for Registration or Forgot password',
      text: `Your OTP is: ${otp}`,
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email send error:', error);
    throw error;
  }
};

module.exports = { sendOtpEmail, transporter };