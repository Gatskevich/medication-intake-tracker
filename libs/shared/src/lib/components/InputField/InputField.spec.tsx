import { render } from "@testing-library/react";

import { InputField } from "./InputField";

const props = {
  id: "test-id",
  label: "test-label",
  error: undefined,
  register: () => {},
};

describe("InputField", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<InputField {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
