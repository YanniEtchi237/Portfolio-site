const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

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




// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

