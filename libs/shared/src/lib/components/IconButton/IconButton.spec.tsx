import { render } from "@testing-library/react";
import { IconBaseProps, IconType } from "react-icons";

import { IconButton } from "./IconButton";

const MockIcon: IconType = ({
  size,
  color,
  title,
  ...restProps
}: IconBaseProps) => {
  return (
    <svg
      xmlns=""
      width={"24"}
      height={"24"}
      fill={"currentColor"}
      viewBox="0 0 24 24"
      {...restProps}
    >
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};

const props = {
  icon: MockIcon,
  onClick: () => {},
};

describe("IconButton", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<IconButton {...props} />);
    expect(baseElement).toBeTruthy();
  });
});
