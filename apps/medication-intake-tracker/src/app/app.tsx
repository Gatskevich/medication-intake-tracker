import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MedicationsProvider } from "../utils/contexts/MedicationsContext";
import { Loading } from "../components/Loading/Loading";

const LazyMedicationList = lazy(
  () => import("../pages/MedicationList/MedicationList"),
);
const LazyMedicationDetails = lazy(
  () => import("../pages/MedicationDetails/MedicationDetails"),
);

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
