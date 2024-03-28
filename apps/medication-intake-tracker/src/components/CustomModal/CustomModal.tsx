import { ReactNode } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; 
import './CustomModal.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface CustomModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    closeModal: () => void;
}

export const CustomModal = ({ isOpen, title, children, closeModal }: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} className='custom-modal'>
       <AnimatePresence>
        <motion.div
          className="modal-content"
            initial={{ opacity: 0, y: -400 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <div className="modal-header">
              <h2>{title}</h2>
              <button className="close-button" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            {children}
          </motion.div>
      </AnimatePresence>
    </Modal>
  );
};
