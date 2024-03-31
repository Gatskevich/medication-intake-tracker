import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IMedication } from "../../interfaces";
import { useMedication } from "../../utils/contexts/MedicationsContext";
import { AddMedicationForm } from "../../components/AddMedicationForm/AddMedicationForm";
import {
  Button,
  ConfirmModal,
  TextNote,
} from "@medication-intake-tracker/shared";
import { AddNoteForm } from "../../components/AddNoteForm/AddNoteForm";
import "./MedicationDetails.scss";

const MedicationDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { getMedicationById, deleteMedication } = useMedication();

  const [medication, setMedication] = useState<IMedication | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const medication = getMedicationById(id ?? "") || null;
    setMedication(medication);
  }, [getMedicationById, id]);

  const handleDelete = () => {
    deleteMedication(id ?? "");
    navigate("/");
  };

  if (!medication) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div
      className="medication-details"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="medication-details__container"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <AddMedicationForm
              medication={medication}
              onClose={() => setIsEditing(false)}
            />
          </motion.div>
        ) : (
          <>
            <div className="medication-details__header">
              <h1 className="medication-details__title">{medication.name}</h1>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="button-container"
              >
                <Button onClick={() => setIsEditing(true)} color="PRIMARY">
                  Edit
                </Button>
                <Button onClick={() => setIsDeleting(true)} color="ERROR">
                  Delete
                </Button>
              </motion.div>
            </div>
            <div className="medication-details__info">
              <div className="medication-details__info-item">
                <span className="medication-details__info-label">
                  Description:
                </span>
                {medication.description}
              </div>
              <div className="medication-details__info-item">
                <span className="medication-details__info-label">
                  Current Count:
                </span>
                {medication.count}
              </div>
              <div className="medication-details__info-item">
                <span className="medication-details__info-label">
                  Destination Count:
                </span>
                {medication.destinationCount}
              </div>
              <div className="medication-details__info-item">
                <span className="medication-details__info-label">
                  Last Updated:
                </span>
                {medication.updatedAt
                  ? new Date(medication.updatedAt).toLocaleString()
                  : "N/A"}
              </div>
              {medication.notes &&
                medication.notes.length > 0 &&
                medication.notes.map((note, index) => (
                  <div key={index} className="medication-details__info-item">
                    <span className="medication-details__info-label">
                      Note {index + 1}:
                    </span>
                    <TextNote text={note} />
                  </div>
                ))}
            </div>
            {!isAddingNote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Button color="SECONDARY" onClick={() => setIsAddingNote(true)}>
                  Add Note
                </Button>
              </motion.div>
            )}
            {isAddingNote && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <AddNoteForm
                  medication={medication}
                  onClose={() => setIsAddingNote(false)}
                />
              </motion.div>
            )}
          </>
        )}
      </motion.div>
      <ConfirmModal
        isOpen={isDeleting}
        title="Delete Medication"
        text="Are you sure you want to delete this medication?"
        onConfirm={handleDelete}
        closeModal={() => setIsDeleting(false)}
      />
    </motion.div>
  );
};

export default MedicationDetails;
