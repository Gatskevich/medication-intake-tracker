import { IMedication } from "../../interfaces";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@medication-intake-tracker/shared";
import "./MedicationListItem.scss";

interface MedicationListItemProps {
  medication: IMedication;
  editMedication: (medication: IMedication) => void;
}

export const MedicationListItem = ({
  medication,
  editMedication,
}: MedicationListItemProps) => (
  <motion.li
    className={`medication-list-item ${medication.count >= medication.destinationCount ? "completed" : ""}`}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    <div className="medication-list-item__content">
      <Link
        to={`/medication/${medication.id}`}
        className="medication-list-item__link"
      >
        <div className="medication-list-item__name">{medication.name}</div>
        <div className="medication-list-item__count">
          <span className="medication-list-item__count-text">
            {medication.count}
          </span>{" "}
          /{" "}
          <span className="medication-list-item__count-text">
            {medication.destinationCount}
          </span>
        </div>
      </Link>
      <div className="medication-list-item__actions">
        {medication.count < medication.destinationCount && (
          <Button
            onClick={() =>
              editMedication({ ...medication, count: medication.count + 1 })
            }
            color="SECONDARY"
          >
            +
          </Button>
        )}
        {medication.count > 0 && (
          <Button
            onClick={() =>
              editMedication({ ...medication, count: medication.count - 1 })
            }
            color="ERROR"
          >
            -
          </Button>
        )}
      </div>
    </div>
  </motion.li>
);
