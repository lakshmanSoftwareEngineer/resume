import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <motion.div
      className="error-message"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FiAlertTriangle size={20} />
      <span>{message}</span>
    </motion.div>
  );
}

export default ErrorMessage;