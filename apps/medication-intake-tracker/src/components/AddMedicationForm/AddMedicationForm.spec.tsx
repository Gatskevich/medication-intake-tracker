import { renderWithProviders } from "../../utils/test-wrapper";

import { AddMedicationForm } from "./AddMedicationForm";

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
  onClose: () => {},
};

describe("AddMedicationForm", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(
      <AddMedicationForm {...props} />,
    );
    expect(baseElement).toBeTruthy();
  });
});
