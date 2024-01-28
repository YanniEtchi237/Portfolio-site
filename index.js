const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up a route for project pages
app.get('/projects/:projectName', (req, res) => {
    const projectName = req.params.projectName;
    console.log('Requested project name:', projectName);

    // Construct the file path with and without .html extension
    const filePathWithHtml = path.join(__dirname, 'public', 'projects', projectName, 'index.html');
    const filePathWithoutHtml = path.join(__dirname, 'public', 'projects', projectName, 'index');

    // Check if the file with .html extension exists
    fs.access(filePathWithHtml, fs.constants.F_OK, (errHtml) => {
        if (!errHtml) {
            // Send the file with .html extension
            res.sendFile(filePathWithHtml);
        } else {
            // Check if the file without .html extension exists
            fs.access(filePathWithoutHtml, fs.constants.F_OK, (errWithoutHtml) => {
                if (errWithoutHtml) {
                    console.error('File does not exist:', errWithoutHtml);
                    res.status(404).send('<h1>404 Not Found</h1>');
                } else {
                    // Send the file without .html extension
                    res.sendFile(filePathWithoutHtml);
                }
            });
        }
    });
});

// Contact form route
app.post('/contact', (req, res) => {
    // Check if body-parser has parsed the body correctly
    if (!req.body) {
        return res.status(400).send('Bad Request: No request body found');
    }

    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yourgmail@gmail.com',
            pass: 'yourgmailpassword'
        }
    });

    // Email content
    const mailOptions = {
        from: 'yourgmail@gmail.com',
        to: 'yannietchi@gmail.com', // Replace with your email
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

