import { render } from "@testing-library/react";

import { Animation } from "./Animation";

const props = {
  animationData: null,
};

describe("Animation", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Animation {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
