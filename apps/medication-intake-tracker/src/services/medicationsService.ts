import { useEffect, useReducer, useRef } from 'react';
import { IMedication } from '../interfaces';
import { useStorage } from '../utils/custom-hooks/useStorage';
import { initialState, medicationsReducer } from '../utils/reducers/medicationsReducer';
import { IMedicationForm } from '../interfaces/IMedicationForm';

export interface IMedicationService {
  medications: IMedication[];
  addMedication: (medication: IMedicationForm) => void;
  updateMedication: (id: string, updatedMedication: Partial<IMedication>) => void;
  deleteMedication: (id: string) => void;
  getMedicationById: (id: string) => IMedication | undefined;
}

const generateId = (): string => {
  return Math.random().toString(36).slice(2, 9);
};

export const useMedicationService = (): IMedicationService => {
  const [medicationsStorage, setMedicationsStorage] = useStorage<IMedication[]>('medications', []);
  const [state, dispatch] = useReducer(medicationsReducer, initialState);
  const { medications } = state;

  const firstRender = useRef(true);

  useEffect(() => {
    dispatch({ type: 'INITIALIZE_MEDICATIONS', payload: medicationsStorage });
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
      id: generateId(),
      updatedAt: Date.now()
    };
  
    dispatch({ type: 'ADD_MEDICATION', payload: newMedication });
  };

  const updateMedication = (id: string, updatedMedication: Partial<IMedication>) => {
    dispatch({ type: 'UPDATE_MEDICATION',  payload: { id, ...updatedMedication, updatedAt: Date.now() } });
  };

  const deleteMedication = (id: string) => {
    dispatch({ type: 'DELETE_MEDICATION', payload: id });
  };

  const getMedicationById = (id: string) => {
    return medications.find(medication => medication.id === id);
  };
 
  return {
    medications,
    addMedication,
    updateMedication,
    deleteMedication,
    getMedicationById
  };
};
