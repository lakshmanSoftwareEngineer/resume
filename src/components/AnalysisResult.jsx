import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiLayout,
  FiEdit3,
  FiTag,
  FiArrowLeft,
} from "react-icons/fi";
import { FaTasks } from "react-icons/fa"; // Using FaTasks for "Suggestions"

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Each child animates 0.1s after the previous
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

function AnalysisResult({ analysis, onReset }) {
  const { ats_score, structure, format, keywords, suggestions } = analysis;

  const getScoreColor = (score) => {
    if (score >= 85) return "#4caf50"; // Green
    if (score >= 60) return "#ffc107"; // Yellow
    return "#f44336"; // Red
  };

  const scoreColor = getScoreColor(ats_score);

  return (
    <motion.div
      className="result-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* --- ATS Score Card --- */}
      <motion.div variants={itemVariants} className="result-card score-card">
        <motion.div
          className="score-circle"
          style={{ borderColor: scoreColor }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
        >
          <motion.span
            className="score-text"
            style={{ color: scoreColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Animated score "count-up" */}
            <ScoreCounter from={0} to={ats_score} />
          </motion.span>
        </motion.div>
        <div className="score-label">ATS Compatibility Score</div>
      </motion.div>

      {/* --- Structure Card --- */}
      <motion.div variants={itemVariants} className="result-card">
        <div className="card-header">
          <FiLayout /> Structure Evaluation
        </div>
        <p className="card-content">{structure}</p>
      </motion.div>

      {/* --- Format Card --- */}
      <motion.div variants={itemVariants} className="result-card">
        <div className="card-header">
          <FiEdit3 /> Format & Readability
        </div>
        <p className="card-content">{format}</p>
      </motion.div>

      {/* --- Keywords Card --- */}
      <motion.div variants={itemVariants} className="result-card">
        <div className="card-header">
          <FiTag /> Relevant Keywords
        </div>
        <ul className="list-container">
          {keywords.map((keyword, index) => (
            <motion.li
              key={index}
              className="keyword-tag"
              variants={itemVariants} // Each tag animates in
            >
              {keyword}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* --- Suggestions Card --- */}
      <motion.div variants={itemVariants} className="result-card">
        <div className="card-header">
          <FaTasks /> Actionable Suggestions
        </div>
        <ul className="list-container" style={{ flexDirection: "column" }}>
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              className="suggestion-item"
              variants={itemVariants} // Each suggestion animates in
            >
              <FiCheckCircle size={18} />
              <span>{suggestion}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* --- Reset Button --- */}
      <motion.button
        variants={itemVariants}
        className="analyze-button"
        onClick={onReset}
        style={{ backgroundColor: "#444", color: "white" }}
      >
        <FiArrowLeft style={{ marginRight: "0.5rem" }} />
        Analyze Another
      </motion.button>
    </motion.div>
  );
}

// A simple component to animate the score number
import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

function ScoreCounter({ from, to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1.5,
      delay: 0.5,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.round(value);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef}>{from}</span>;
}

export default AnalysisResult;