import { IMedication } from "../../interfaces";

export const initialState = {
  medications: [],
};

export interface MedicationsState {
  medications: IMedication[];
}

export type MedicationsAction = 
  | { type: "ADD_MEDICATION", payload: IMedication }
  | { type: "INITIALIZE_MEDICATIONS", payload: IMedication[] }
  | { type: "UPDATE_MEDICATION", payload: Partial<IMedication> }
  | { type: "DELETE_MEDICATION", payload: string };

export const medicationsReducer = (state: MedicationsState, action: MedicationsAction ): MedicationsState => {
  switch (action.type) {
    case 'INITIALIZE_MEDICATIONS':
      return {
        ...state,
        medications: action.payload,
    };
    case 'ADD_MEDICATION':
      return {
        ...state,
        medications: [...state.medications, action.payload],
      };
    case 'UPDATE_MEDICATION':
      return {
        ...state,
        medications: state.medications.map((medication: IMedication) => {
          if (medication.id === action.payload.id) {
            return {...medication, ...action.payload};
          }
          return medication;
        }),
      };
    case 'DELETE_MEDICATION':
      return {
        ...state,
        medications: state.medications.filter((medication: IMedication) => medication.id !== action.payload),
      };
    default:
      return state;
  }
};