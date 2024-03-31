import { renderWithProviders } from "../../utils/test-wrapper";

import { Loading } from "./Loading";

describe("Loading", () => {
  it("should render successfully", () => {
    const { baseElement } = renderWithProviders(<Loading />);
    expect(baseElement).toBeTruthy();
  });
});
