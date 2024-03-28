import { IMedication } from "../../../interfaces";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import './MedicationListItem.scss';

interface MedicationListItemProps {
    medication: IMedication;
    editMedication: (medication: IMedication) => void;
}

export const MedicationListItem = ({ medication, editMedication }: MedicationListItemProps) => (
    <motion.li
      className={`medication-list__item ${medication.count >= medication.destinationCount ? 'completed' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Link to={`/medication/${medication.id}`} className="medication-list__link">
        <div className="medication-list__name">{medication.name}</div>
        <div className="medication-list__count">{medication.count} / {medication.destinationCount}</div>
      </Link>
      <div className="medication-list__actions">
        {medication.count < medication.destinationCount && (
          <button onClick={() => editMedication({ ...medication, count: medication.count + 1 })}>Increment</button>
        )}
        {medication.count > 0 && (
          <button onClick={() => editMedication({ ...medication, count: medication.count - 1 })}>Decrement</button>
        )}
      </div>
    </motion.li>
  );