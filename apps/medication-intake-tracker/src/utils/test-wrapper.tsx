import React from "react";
import { render } from "@testing-library/react";
import { MedicationsProvider } from "./contexts/MedicationsContext";

const TestProvidersWrapper = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  return <MedicationsProvider>{children}</MedicationsProvider>;
};

export const renderWithProviders = (ui: React.ReactElement, options?: any) => {
  return render(ui, { wrapper: TestProvidersWrapper, ...options });
};
