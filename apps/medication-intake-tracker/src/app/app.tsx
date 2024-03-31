import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MedicationsProvider } from "../utils/contexts/MedicationsContext";
import { Loading } from "../components/Loading/Loading";

const LazyMedicationList = lazy(() => {
  return Promise.all([
    import("../pages/MedicationList/MedicationList"),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]).then(([moduleExports]) => moduleExports);
});

const LazyMedicationDetails = lazy(() => {
  return Promise.all([
    import("../pages/MedicationDetails/MedicationDetails"),
    new Promise((resolve) => setTimeout(resolve, 1500)),
  ]).then(([moduleExports]) => moduleExports);
});

const App = () => {
  return (
    <MedicationsProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<LazyMedicationList />} />
            <Route
              path="/medication/:id/*"
              element={<LazyMedicationDetails />}
            />
          </Routes>
        </Suspense>
      </Router>
    </MedicationsProvider>
  );
};

export default App;
