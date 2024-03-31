import { render } from "@testing-library/react";

import { CustomModal } from "./CustomModal";

const props = {
  isOpen: true,
  title: "Title",
  children: "Text",
  closeModal: () => {},
};

describe("CustomModal", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CustomModal {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
