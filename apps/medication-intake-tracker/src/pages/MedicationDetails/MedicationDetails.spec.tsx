import { renderWithProviders } from "../../utils/test-wrapper";

import MedicationDetails from "./MedicationDetails";

describe("MedicationDetails", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(<MedicationDetails />);
    expect(baseElement).toBeTruthy();
  });
});
