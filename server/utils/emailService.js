const nodemailer = require('nodemailer');

// Create transporter once and reuse it everywhere
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // for development only – you can remove this later
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
    throw error; // Rethrow to handle in the route
  }
};

module.exports = { sendOtpEmail, transporter };