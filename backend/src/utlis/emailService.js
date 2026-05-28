import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
    type: "OAuth2",
    user: "hartezz46@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
})


mailText = ""


export const emailSend = async (to, otpCode ) => {
    try {
        const mailOption = {
            from: "hartezz46@gmail.com",
            to: to,
            subject: "Your OTP for nstHelper",
            text: `
                <!DOCTYPE html>
                <html>
                <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Verification Code</title>
                <style>
                    body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f6f9fc;
                    margin: 0;
                    padding: 0;
                    }
                    .email-container {
                    max-width: 500px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    border: 1px solid #e1e8ed;
                    }
                    .header {
                    background-color: #4F46E5; /* Royal Blue/Indigo Accent */
                    padding: 30px 20px;
                    text-align: center;
                    }
                    .header h1 {
                    color: #ffffff;
                    font-size: 24px;
                    margin: 0;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    }
                    .content {
                    padding: 40px 30px;
                    text-align: center;
                    color: #333333;
                    }
                    .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    color: #555555;
                    }
                    .otp-container {
                    background-color: #f3f4f6;
                    border-radius: 6px;
                    padding: 16px 24px;
                    display: inline-block;
                    letter-spacing: 6px;
                    font-weight: 700;
                    font-size: 32px;
                    color: #111827;
                    border: 1px dashed #9ca3af;
                    margin-bottom: 30px;
                    }
                    .footer {
                    background-color: #f9fafb;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #9ca3af;
                    border-top: 1px solid #f3f4f6;
                    }
                    .expiry-note {
                    font-size: 13px;
                    color: #ef4444;
                    margin-top: 10px;
                    }
                </style>
                </head>
                <body>

                <div class="email-container">
                    <div class="header">
                    <h1>Security Verification</h1>
                    </div>

                    <div class="content">
                    <p>Hello,</p>
                    <p>We received a request to log in to your account. Use the following One-Time Password (OTP) to complete your verification setup:</p>
                    
                    <div class="otp-container">${otpCode}</div>
                    
                    <p class="expiry-note">This code is valid for the next 10 minutes. Please do not share this OTP with anyone for security reasons.</p>
                    <p style="margin-top: 40px; font-size: 14px; color: #888888;">If you did not request this login, you can safely ignore this email.</p>
                    </div>

                    <div class="footer">
                    &copy; 2026 Hartej School of Technology. <br>
                    Automated security notification.
                    </div>
                </div>

                </body>
                </html>
                `
        };

        const info = await transporter.sendMail(mailOption);
        return info;
        
    } catch (error) {
        throw new Error("Email failed to send")
        return null
    }
}
