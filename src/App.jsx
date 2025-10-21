import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiCpu, FiFileText } from "react-icons/fi";
import FileUpload from "./components/FileUpload";
import AnalysisResult from "./components/AnalysisResult";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

// Import your CSS
import "./index.css";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (selectedFile) => {
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null); // Clear previous errors
    } else {
      setFile(null);
      setError("Please select a PDF file.");
    }
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Make sure your backend is running on http://localhost:3000
      // or update this URL
      const response = await axios.post(
        "https://ai-resume-analyzer-backend-owga.onrender.com/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      setAnalysis(response.data.analysis);
      setFile(null); // Clear the file after successful analysis

    } catch (err) {
      console.error("API Call Error:", err);
      const errorMsg =
        err.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    
    if (analysis) {
      return (
        <AnalysisResult analysis={analysis} onReset={handleReset} />
      );
    }
    
    // Default view (Upload)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FileUpload
          onFileSelect={handleFileSelect}
          file={file}
          onAnalyze={handleAnalysis}
          isLoading={isLoading}
        />
        {error && <ErrorMessage message={error} />}
      </motion.div>
    );
  };

  return (
    <div className="app-container">
      <header className="header">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FiCpu style={{ marginRight: "0.5rem" }} />
          AI Resume Analyzer
        </motion.h1>
        <p>Upload your PDF resume to get an instant ATS-driven analysis.</p>
      </header>

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={isLoading ? "loading" : (analysis ? "result" : "upload")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;