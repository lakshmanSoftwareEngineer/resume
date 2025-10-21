const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const port = 3001; // You can change this port if needed

app.use(cors()); // Enable Cross-Origin Resource Sharing for your React app

// Configure multer to handle file uploads. It will save files to an 'uploads/' directory.
const upload = multer({ dest: 'uploads/' });

// Define the /analyze route to handle the resume file
app.post('/analyze', upload.single('resume'), (req, res) => {
  // 'resume' is the key we used in our FormData on the frontend
  if (!req.file) {
    return res.status(400).json({ message: 'No resume file uploaded.' });
  }

  console.log('File received:', req.file);

  // =================================================================
  // TODO: Add your AI analysis logic here.
  // You can read the file content from `req.file.path`.
  // For now, we'll just return a mock success response.
  // =================================================================

  // Send back a JSON response with the analysis results
  res.json({
    message: 'Analysis successful!',
    filename: req.file.originalname,
    analysis: {
      keywords: ['React', 'Node.js', 'Software Engineering', 'JavaScript'],
      score: 85,
    },
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});