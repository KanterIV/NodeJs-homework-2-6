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
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            margin: 0;
            padding: 0;
            text-align: center;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        h2 {
            color: #6f42c1;
            font-size: 24px;
            margin-bottom: 10px;
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
            background-image: linear-gradient(to right, #6f42c1, #9b59b6);
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            border: none;
            cursor: pointer;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #888;
        }
        .social-links a {
            margin: 0 10px;
            color: #6f42c1;
            text-decoration: none;
            font-weight: bold;
        }
        .social-links a:hover {
            text-decoration: underline;
        }
        .divider {
            height: 1px;
            background-color: #ccc;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Confirmation</h2>
        <p>Thank you for registering! Please click the button below to confirm your email address:</p>
        <a class="button" target="_blank" href="${BASE_URL}/users/verify/${verificationToken}" style="color: #ffffff;">Confirm Your Email</a>
        
        <div class="divider"></div>
        
        <div class="footer">
            <p>Thank you for joining us!</p>
            <p>Best regards,<br>ContactsHub</p>
            <div class="social-links">
                <p>Follow us on:</p>
                <a href="https://www.linkedin.com/in/ihor-kanter/" target="_blank">LinkedIn</a> |
                <a href="https://t.me/kanterigor" target="_blank">Telegram</a> |
                <a href="https://www.instagram.com/igor_kanter/" target="_blank">Instagram</a>
            </div>
        </div>
    </div>
</body>
</html>

   `,
  };
};

module.exports = { verifyEmailMessage };
