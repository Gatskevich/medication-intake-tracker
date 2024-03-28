import { useEffect, useReducer, useRef } from "react";
import { useStorage } from "../utils/custom-hooks/useStorage";
import {
  initialState,
  medicationsReducer,
} from "../utils/reducers/medicationsReducer";
import { IMedicationForm, IMedication } from "../interfaces";
import { generateUuidv4 } from "../utils/help-functions/generateUuidv4";

export interface IMedicationService {
  medications: IMedication[];
  addMedication: (medication: IMedicationForm) => void;
  updateMedication: (
    id: string,
    updatedMedication: Partial<IMedication>,
  ) => void;
  deleteMedication: (id: string) => void;
  getMedicationById: (id: string) => IMedication | undefined;
}

export const useMedicationService = (): IMedicationService => {
  const [medicationsStorage, setMedicationsStorage] = useStorage<IMedication[]>(
    "medications",
    [],
  );
  const [state, dispatch] = useReducer(medicationsReducer, initialState);
  const { medications } = state;

  const firstRender = useRef(true);

  useEffect(() => {
    dispatch({ type: "INITIALIZE_MEDICATIONS", payload: medicationsStorage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setMedicationsStorage(medications);
    }
  }, [medications, setMedicationsStorage]);

  const addMedication = (medication: IMedicationForm) => {
    const newMedication: IMedication = {
      ...medication,
      id: generateUuidv4(),
      updatedAt: Date.now(),
    };

    dispatch({ type: "ADD_MEDICATION", payload: newMedication });
  };

  const updateMedication = (
    id: string,
    updatedMedication: Partial<IMedication>,
  ) => {
    dispatch({
      type: "UPDATE_MEDICATION",
      payload: { id, ...updatedMedication, updatedAt: Date.now() },
    });
  };

  const deleteMedication = (id: string) => {
    dispatch({ type: "DELETE_MEDICATION", payload: id });
  };

  const getMedicationById = (id: string) => {
    return medications.find((medication) => medication.id === id);
  };

  return {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
    getMedicationById,
  };
};
