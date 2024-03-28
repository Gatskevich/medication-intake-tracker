import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMedication } from '../../interfaces';
import {AddMedicationForm} from './AddMedicationForm/AddMedicationForm';
import {CustomModal} from '../CustomModal/CustomModal';
import { useMedication } from '../../utils/contexts/MedicationsContext';
import { MedicationListItem } from './MedicationListItem/MedicationListItem';
import './MedicationList.scss';

const MedicationList = () => {
  const { medications, updateMedication } = useMedication();
  
  const [showModal, setShowModal] = useState(false);
  
  const sortedMedications = useMemo(() => {
    const sorted = [...medications].sort((a, b) => {
        if (a.count >= a.destinationCount && b.count >= b.destinationCount) {
            return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
        } else if (a.count >= a.destinationCount) {
            return 1;
        } else if (b.count >= b.destinationCount) {
            return -1;
        } else {
            return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
        }
    });
    return sorted;
}, [medications]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const editMedication = useCallback((medication: IMedication) => {
    if (!medication.id) {
      return;
    }
    
    updateMedication(medication.id, medication);
  }, [updateMedication]);

  return (
    <motion.div
      className="medication-list"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="medication-list__title">Medication List</h1>
      <ul className="medication-list__items">
        <AnimatePresence>
          {sortedMedications.map((medication) => (
            <MedicationListItem key={medication.id} medication={medication} editMedication={editMedication} />
          ))}
        </AnimatePresence>
      </ul>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button onClick={openModal} className="medication-list__add-button">Add Medication</button>
      </motion.div>
      <CustomModal closeModal={closeModal} isOpen={showModal} title={'Add Medication'}>
        <AddMedicationForm onClose={closeModal} />
      </CustomModal>
    </motion.div>
  );
}

export default MedicationList;
