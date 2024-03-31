import { vi } from "vitest";
import React from 'react';

vi.mock('react-router-dom', async () => {
  const actual: Record<string, unknown> = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn),
    useSearchParams: vi.fn(() => {
      const search = new URLSearchParams();
      const setSearch = vi.fn();
  
      return [search, setSearch];
    }),
    useLocation: vi.fn(() => ({
      pathname: '/',
    })),
    useRoutes: (routes) => {
      return routes;
    },
    useParams: () => ({
      id: 'id',
      userId: 'id',
    }),
    Link: vi.fn().mockImplementation(({ to, children }) => (
      <a href={to}>{children}</a>
    )),
    Navigate: ({ to, replace }) => {
      return <div data-navigate-to={to} data-replace={replace} />;
    },
  };
});