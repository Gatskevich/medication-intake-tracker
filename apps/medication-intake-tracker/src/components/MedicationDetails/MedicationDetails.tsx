import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { IMedication } from "../../interfaces";
import { useMedication } from "../../utils/contexts/MedicationsContext";
import { AddMedicationForm } from "../MedicationList/AddMedicationForm/AddMedicationForm";
import "./MedicationDetails.scss";

import { TextNote } from "./TextNote/TextNote";
import { AddNoteForm } from "./AddNoteForm/AddNoteForm";

const MedicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMedicationById, deleteMedication } = useMedication();
  const [medication, setMedication] = useState<IMedication | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const fetchMedication = useCallback(() => {
    const medication = getMedicationById(id ?? "") || null;
    setMedication(medication);
  }, [getMedicationById, id]);

  useEffect(() => {
    fetchMedication();
  }, [fetchMedication, id]);

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
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="medication-details__header">
          <h1 className="medication-details__title">{medication.name}</h1>
          <motion.button
            className="medication-details__edit-button"
            onClick={() => setIsEditing(!isEditing)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </motion.button>
          <motion.button
            className="medication-details__delete-button"
            onClick={handleDelete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Delete
          </motion.button>
        </div>
        {isEditing ? (
          <AddMedicationForm
            medication={medication}
            onClose={() => setIsEditing(false)}
          />
        ) : (
          <>
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
                      Note:
                    </span>
                    <TextNote text={note} />
                  </div>
                ))}
            </div>
            {!isAddingNote && (
              <motion.button
                className="medication-details__add-note-button"
                onClick={() => setIsAddingNote(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Note
              </motion.button>
            )}
            {isAddingNote && (
              <AddNoteForm
                medication={medication}
                onClose={() => setIsAddingNote(false)}
              />
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default MedicationDetails;
