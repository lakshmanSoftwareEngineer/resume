import { motion } from "framer-motion";
import { FiLoader } from "react-icons/fi";

function Loader() {
  return (
    <div className="loader-container">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
      >
        <FiLoader size={40} className="icon-primary" />
      </motion.div>
      <p>Analyzing resume... this may take a moment.</p>
    </div>
  );
}

export default Loader;