import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FiUploadCloud, FiFile } from "react-icons/fi";

function FileUpload({ onFileSelect, file, onAnalyze, isLoading }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileSelect(acceptedFiles[0]);
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "dropzone-active" : ""}`}
      >
        <input {...getInputProps()} />
        <div className="dropzone-content">
          <FiUploadCloud size={50} />
          {isDragActive ? (
            <p>Drop the PDF here ...</p>
          ) : (
            <p>Drag 'n' drop your resume here, or click to select</p>
          )}
          <em>(Only *.pdf files will be accepted)</em>
        </div>
      </div>

      {file && (
        <motion.div
          className="file-name"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FiFile style={{ marginRight: "0.5rem" }} />
          Selected: {file.name}
        </motion.div>
      )}

      <motion.button
        className="analyze-button"
        onClick={onAnalyze}
        disabled={!file || isLoading}
        whileHover={{ scale: !file || isLoading ? 1 : 1.03 }}
        whileTap={{ scale: !file || isLoading ? 1 : 0.98 }}
      >
        {isLoading ? "Analyzing..." : "Analyze Resume"}
      </motion.button>
    </motion.div>
  );
}

export default FileUpload;