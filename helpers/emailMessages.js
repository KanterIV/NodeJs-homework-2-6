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
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h2 {
            color: #3498db;
        }
        p {
            color: #555;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Confirmation</h2>
        <p>Thank you for registering. Please click the link below to confirm your email address:</p>
       <a target="_blank" href="${BASE_URL}/user/verify/${verificationToken}">Click to verify your e-mail</a>
    </div>
</body>
</html>
    
   `,
  };
};

module.exports = {
  verifyEmailMessage,
};
