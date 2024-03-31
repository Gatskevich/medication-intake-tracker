import { render } from "@testing-library/react";

import { ConfirmModal } from "./ConfirmModal";

const props = {
  isOpen: true,
  title: "Title",
  text: "Text",
  onConfirm: () => {},
  closeModal: () => {},
};

describe("ConfirmModal", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<ConfirmModal {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
