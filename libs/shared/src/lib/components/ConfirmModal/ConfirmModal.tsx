import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";
import { IconButton } from "../IconButton/IconButton";
import { IconCloseOutline } from "../../icons";
import { Button } from "../Button/Button";
import "./ConfirmModal.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  onConfirm: () => void;
  closeModal: () => void;
}

export const ConfirmModal = ({
  isOpen,
  title,
  text,
  onConfirm,
  closeModal,
}: ConfirmModalProps) => {
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
          <div className="custom-modal__form">{text}</div>
          <div className="custom-modal__footer">
            <Button color="SECONDARY" onClick={onConfirm}>
              Confirm
            </Button>
            <Button color="ERROR" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </Modal>
  );
};
