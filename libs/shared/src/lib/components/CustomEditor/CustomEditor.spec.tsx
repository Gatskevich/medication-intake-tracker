import { render } from "@testing-library/react";

import { CustomEditor } from "./CustomEditor";

const field = {
  value: "test",
  onChange: () => {},
};

const props = {
  field,
};

describe("CustomEditor", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<CustomEditor {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
