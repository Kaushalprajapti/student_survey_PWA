import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SurveyFormPage from './pages/SurveyFormPage';
import SubmissionsPage from './pages/SubmissionsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/survey/:surveyId" element={<SurveyFormPage />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
