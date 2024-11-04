// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const app = express();

// // Middleware for parsing form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve static files if you have any (like CSS or images)
// // If you have a folder named 'public' with styles or images, you can still use this line.
// // Otherwise, you can remove it if unnecessary:
// // app.use(express.static('public'));

// // Handle GET request for the homepage
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/form.html');
// });

// // Handle form submission
// app.post('/submit-form', (req, res) => {
//     const { name, email, service, thesisTitle, thesisDescription, wordCount, deadline } = req.body;

//     // Configure Nodemailer to use Gmail
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.GMAIL_USER,  // Use environment variable for Gmail user
//             pass: process.env.GMAIL_PASS   // Use environment variable for Gmail password
//         }
//     });

//     // Setup email options
//     const mailOptions = {
//         from: email,  // Form submitter's email
//         to: process.env.GMAIL_USER,  // Your Gmail address
//         subject: `New Thesis Request from ${name}`,
//         text: `
//         Ονοματεπώνυμο: ${name}
//         Email επικοινωνίας: ${email}
//         Υπηρεσία: ${service}
//         Θέμα: ${thesisTitle}
//         Περιγραφή: ${thesisDescription}
//         Αριθμός λέξεων: ${wordCount}
//         Προθεσμία: ${deadline}
//         `
//     };

//     // Send the email
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.send('Error sending the email.');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Η αίτηση σας έχει υποβληθεί με επιτυχία!');
//         }
//     });
// });

// // Set port and start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
