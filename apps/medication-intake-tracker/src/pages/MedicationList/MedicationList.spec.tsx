import { renderWithProviders } from "../../utils/test-wrapper";

import MedicationList from "./MedicationList";

describe("MedicationList", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(<MedicationList />);
    expect(baseElement).toBeTruthy();
  });
});
