import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MedicationsProvider } from '../utils/contexts/MedicationsContext';
import styles from './app.module.scss';

const LazyMedicationList = lazy(() => import('../components/MedicationList/MedicationList'));
const LazyMedicationDetails = lazy(() => import('../components/MedicationDetails/MedicationDetails'));

const App = () => {
  return (
    <MedicationsProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LazyMedicationList />} />
            <Route path="/medication/:id/*" element={<LazyMedicationDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </MedicationsProvider>
  );
}

export default App;
