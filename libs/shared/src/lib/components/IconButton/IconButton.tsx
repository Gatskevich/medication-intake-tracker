import { motion } from "framer-motion";
import { IconType } from "react-icons";
import "./IconButton.scss";

interface IconButtonProps {
  icon: IconType;
  onClick: () => void;
}

export const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <motion.button
      className="icon-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <Icon />
    </motion.button>
  );
};
