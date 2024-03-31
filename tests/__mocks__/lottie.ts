import { vi } from "vitest";

vi.mock("react-lottie", () => ({
  __esModule: true,
  default: vi.fn(),
}));