import React, { useState } from 'react';
import axios from 'axios';

const ResumeUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setAnalysis(null); // Reset previous analysis
    setError('');      // Reset previous error
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError('Please select a file to analyze.');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnalysis(null);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('resume', selectedFile); // The key 'resume' must match the backend

    try {
      // Make a POST request to your backend's /analyze endpoint
      // Ensure the URL points to your running server (e.g., http://localhost:3001)
      const response = await axios.post('http://localhost:3001/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnalysis(response.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(`Analysis failed: ${err.response.data.message || err.message}`);
      } else {
        setError(`An unexpected error occurred: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Resume Analyzer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resume-upload">Upload your resume (PDF, DOC, DOCX, TXT):</label>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {analysis && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(analysis, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;