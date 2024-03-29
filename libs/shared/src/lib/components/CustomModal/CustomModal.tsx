import { ReactNode } from "react";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "../IconButton/IconButton";
import { IconCloseOutline } from "../../icons";
import "./CustomModal.scss";

interface CustomModalProps {
  isOpen: boolean;
  title: string;
  children: ReactNode;
  closeModal: () => void;
}

export const CustomModal = ({
  isOpen,
  title,
  children,
  closeModal,
}: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} className="custom-modal">
      <AnimatePresence>
        <motion.div
          className="custom-modal__content"
          initial={{ opacity: 0, y: -400 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="custom-modal__header">
            <h2 className="custom-modal__title">{title}</h2>
            <div className="custom-modal__close-button">
              <IconButton icon={IconCloseOutline} onClick={closeModal} />
            </div>
          </div>
          <div className="custom-modal__form">{children}</div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};
