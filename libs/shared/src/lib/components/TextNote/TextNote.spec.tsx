import { render } from "@testing-library/react";

import { TextNote } from "./TextNote";

const props = {
  text: "test-text",
};

describe("TextNote", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TextNote {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
