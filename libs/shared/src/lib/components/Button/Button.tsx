import { ReactNode } from "react";
import { motion } from "framer-motion";
import "./Button.scss";

enum ButtonColor {
  PRIMARY = "PRIMARY",
  SECONDARY = "SECONDARY",
  ERROR = "ERROR",
}

const colors = {
  [ButtonColor.PRIMARY]: "primary",
  [ButtonColor.SECONDARY]: "secondary",
  [ButtonColor.ERROR]: "error",
};

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  type?: "button" | "submit";
  color?: keyof typeof ButtonColor;
}

export const Button = ({
  children,
  onClick,
  color = ButtonColor.PRIMARY,
  type = "button",
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      className={`medication-button ${colors[color]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
