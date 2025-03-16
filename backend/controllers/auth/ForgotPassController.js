import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../../models/User.js";
import crypto from "crypto";

dotenv.config();

export const forgotPassowrd = async (req, res) => {
    const {email}=req.body;
    const user= await User.findOne({email: email});
    if(!user){
        return res.status(404).json({message: "User not found"});
    }
    const timestamp=Date.now().toString().slice(-6);
    const randomPart = crypto.randomInt(100000, 999999).toString();
    const uniqueCode = (parseInt(timestamp + randomPart.slice(-3)) % 1000000).toString().padStart(6, '0');
    user.resetToken=uniqueCode;
    user.resetTokenExpiration=Date.now() + 3600000; // 1 hour
    await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your app password
    },
  });
  const mailOptions = {
    from: "Facebook <security@facebookmail.com>", // Replace with your website name
    to: email, // User's email
    subject: "One more step to change your password",
    html: `
        <h3>One more step to change your password</h3>
        <p>Hi ${user.firstName},</p>
        <p>We got your request to change your password.</p>
        
        <p><strong>Finish password change</strong></p>
        <p>Click the link below to reset your password:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password/${email}/${uniqueCode}">Reset Password</a>
        
        <p>Alternatively, enter this code in the app:</p>
        <h4>${uniqueCode}</h4>
        
        <p><strong>Don't share this code with anyone.</strong></p>
        <p>If someone asks for this code, don't share it with anyone, especially if they tell you they work for Facebook or Meta. They may be trying to hack your account.</p>
        
        <p><strong>Didn't request this?</strong></p>
        <p>If you got this email but aren’t trying to reset your password, let us know. You don't need to take any further steps, as long as you don’t share this code with anyone.</p>
        <p>If you’d like to make your account more secure, <a href="https://www.facebook.com/help/check-email" target="_blank">visit Security Checkup</a>.</p>

        <p>Thanks,</p>
        <p><strong>Meta Security</strong></p>

        <p><i>Wondering if this email is really from us? <a href="https://www.facebook.com/help/check-email" target="_blank">Visit the Help Center to confirm.</a></i></p>
        <footer>
            <p>© Facebook. Meta Platforms, Inc., Attention: Community Support, 1 Meta Way, Menlo Park, CA 94025</p>
            <p>This message was sent to ${"mashrur950@gmail.com"}. To help keep your account secure, please don't forward this email.</p>
            <p><a href="https://www.facebook.com/help" target="_blank">Learn more</a></p>
        </footer>
    `
};

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent!", info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


