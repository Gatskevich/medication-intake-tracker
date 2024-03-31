import { renderWithProviders } from "../../utils/test-wrapper";

import { AddNoteForm } from "./AddNoteForm";

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

describe("AddNoteForm", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(<AddNoteForm {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
