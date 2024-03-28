import { ReactNode, createContext, useContext } from "react";
import {
  IMedicationService,
  useMedicationService,
} from "../../services/medicationsService";

const MedicationsContext = createContext<IMedicationService | undefined>(
  undefined,
);

interface MedicationsProviderProps {
  children: ReactNode;
}

export const MedicationsProvider = ({ children }: MedicationsProviderProps) => {
  const medicationService = useMedicationService();

  return (
    <MedicationsContext.Provider value={medicationService}>
      {children}
    </MedicationsContext.Provider>
  );
};

export const useMedication = () => {
  const context = useContext(MedicationsContext);
  if (!context) {
    throw new Error("useMedication must be used within a MedicationProvider");
  }
  return context;
};
