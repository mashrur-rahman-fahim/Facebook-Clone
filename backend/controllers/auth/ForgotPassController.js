import dotenv from "dotenv";
import nodemailer from "nodemailer";
import User from "../../models/User.js";
import crypto from "crypto";

dotenv.config();

export const forgotPassowrd = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const timestamp = Date.now().toString().slice(-6);
  const randomPart = crypto.randomInt(100000, 999999).toString();
  const uniqueCode = (parseInt(timestamp + randomPart.slice(-3)) % 1000000)
    .toString()
    .padStart(6, "0");
  user.resetToken = uniqueCode;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
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
       <div style="max-width: 600px; margin: 0 auto; font-family: Helvetica, Arial, sans-serif; color: #1c1e21; line-height: 1.5;">
    <div style="padding: 20px; border-bottom: 1px solid #dddfe2;">
        <svg style="width: 40px; height: 40px; color: #1877f2;" viewBox="0 0 48 48" fill="none">
            <path d="M48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 35.9789 8.77641 45.908 20.25 47.7084V30.9375H14.1562V24H20.25V18.7125C20.25 12.6975 23.8331 9.375 29.3152 9.375C31.9402 9.375 34.6875 9.84375 34.6875 9.84375V15.75H31.6613C28.68 15.75 27.75 17.6002 27.75 19.5V24H34.4062L33.3422 30.9375H27.75V47.7084C39.2236 45.908 48 35.9789 48 24Z" fill="currentColor"/>
        </svg>
    </div>

    <div style="padding: 20px;">
        <h3 style="color: #1c1e21; font-size: 20px; margin: 0 0 20px 0;">One more step to change your password</h3>
        
        <p>Hi ${user.firstName},</p>
        <p>We got your request to change your password.</p>
        
        <div style="margin: 25px 0; padding: 15px; background: #f0f2f5; border-radius: 6px;">
            <p style="margin: 0 0 15px 0; font-weight: 600;">Finish password change</p>
            <a href="${process.env.FRONTEND_URL}/reset-password/${email}/${uniqueCode}" 
               style="display: inline-block; background: #1877f2; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; font-weight: 600; margin-bottom: 15px;">
                Reset Password
            </a>
            <p style="margin: 15px 0;">Alternatively, enter this code in the app:</p>
            <div style="font-size: 24px; letter-spacing: 2px; padding: 15px; 
                      background: white; border-radius: 6px; text-align: center; 
                      border: 1px solid #dddfe2; margin: 15px 0;">
                ${uniqueCode}
            </div>
        </div>

        <div style="margin: 25px 0; padding: 15px; border: 1px solid #f02849; border-radius: 6px;">
            <p style="color: #f02849; margin: 0 0 10px 0; font-weight: 600;">⚠️ Don't share this code with anyone</p>
            <p style="margin: 0; font-size: 14px;">
                If someone asks for this code, don't share it - even if they claim to work for Facebook or Meta. 
                They may be trying to hack your account.
            </p>
        </div>

        <div style="margin: 25px 0;">
            <p style="font-weight: 600;">Didn't request this?</p>
            <p>If you got this email but aren’t trying to reset your password:</p>
            <ul style="padding-left: 20px;">
                <li>You don't need to take any action</li>
                <li>Don't share this code with anyone</li>
                <li><a href="https://www.facebook.com/help/check-email" 
                     style="color: #1877f2; text-decoration: none;">Visit Security Checkup</a></li>
            </ul>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dddfe2;">
            <p>Thanks,<br><strong>Meta Security</strong></p>
            <p style="font-size: 12px; color: #606770;">
                <em>Wondering if this email is really from us? 
                <a href="https://www.facebook.com/help/check-email" 
                   style="color: #1877f2; text-decoration: none;">Learn how to confirm</a></em>
            </p>
        </div>
    </div>

    <footer style="background: #f0f2f5; padding: 20px; font-size: 12px; color: #606770;">
        <p style="margin: 0 0 10px 0;">
            © Facebook. Meta Platforms, Inc., Attention: Community Support,<br>
            1 Meta Way, Menlo Park, CA 94025
        </p>
        <p style="margin: 0 0 10px 0;">
            This message was sent to ${"mashrur950@gmail.com"}.<br>
            To help keep your account secure, please don't forward this email.
        </p>
        <a href="https://www.facebook.com/help" 
           style="color: #1877f2; text-decoration: none;">Learn more</a>
    </footer>
</div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent!", info });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
