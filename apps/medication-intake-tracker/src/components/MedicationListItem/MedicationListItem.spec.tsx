import { renderWithProviders } from "../../utils/test-wrapper";

import { MedicationListItem } from "./MedicationListItem";
import { IMedication } from "../../interfaces";

const medication = {
  id: "medication-1",
  name: "Medication 1",
  description: "Description of Medication 1",
  count: 0,
  destinationCount: 5,
  updatedAt: 1657160000,
};

const props = {
  medication,
  editMedication: (medication: IMedication) => {},
};

describe("MedicationListItem", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(
      <MedicationListItem {...props} />,
    );
    expect(baseElement).toBeTruthy();
  });
});
