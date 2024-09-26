const { BASE_URL } = process.env;

const verifyEmailMessage = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: #f9f9f9;
        }
        .container {
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        h2 {
            color: #6f42c1;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 15px 30px;
            background-color: #6f42c1;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #888;
        }
        .social-icons {
            margin-top: 20px;
        }
        .social-icons a {
            display: inline-block;
            margin: 0 10px;
            text-decoration: none;
        }
        .social-icons img {
            width: 30px;
            height: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Confirmation</h2>
        <p>Thank you for registering! Please click the button below to confirm your email address:</p>
        <a class="button" target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Confirm Your Email</a>
        
        <div class="footer">
            <p>Thank you for joining us!</p>
            <p>Best regards,</p>
            <p>ContactsHube</p>
            <div class="social-icons">
                <a href="https://www.linkedin.com/in/ihor-kanter/" target="_blank" aria-label="Linkedin">
                    <img src="https://res.cloudinary.com/duy2qr2ck/image/upload/v1727344554/linkedin_olk0ec.svg" alt="Linkedin">
                </a>
                <a href="https://t.me/kanterigor" target="_blank" aria-label="Telegram">
                    <img src="https://res.cloudinary.com/duy2qr2ck/image/upload/v1727344554/telegram_pfpxys.svg" alt="Telegram">
                </a>
                <a href="https://www.instagram.com/igor_kanter/" target="_blank" aria-label="Instagram">
                    <img src="https://res.cloudinary.com/duy2qr2ck/image/upload/v1727344554/instagram_hhhxvx.svg" alt="Instagram">
                </a>
            </div>
        </div>
    </div>
</body>
</html>
    
   `,
  };
};

module.exports = { verifyEmailMessage };
