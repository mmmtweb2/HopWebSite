import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EditModeProvider } from './contexts/EditModeContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Apps from './pages/Apps';
import SituationReports from './pages/SituationReports';
import KnowledgeBase from './pages/KnowledgeBase';
import ExtendedKnowledge from './pages/ExtendedKnowledge';
import Overlaps from './pages/Overlaps';
import Contacts from './pages/Contacts';
import Calendar from './pages/Calendar';
import DepartmentsRoot from './pages/DepartmentsRoot';
import DepartmentsLayout from './layouts/DepartmentsLayout';
import DepartmentPage from './pages/departments/DepartmentPage';

function App() {
  return (
    <EditModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Core Pages */}
            <Route index element={<Home />} />
            <Route path="apps" element={<Apps />} />
            <Route path="situation-reports" element={<SituationReports />} />
            <Route path="knowledge-base" element={<KnowledgeBase />} />
            <Route path="extended-knowledge" element={<ExtendedKnowledge />} />
            <Route path="overlaps" element={<Overlaps />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="calendar" element={<Calendar />} />

            {/* Departments with nested layout */}
            <Route path="departments" element={<DepartmentsLayout />}>
              <Route index element={<DepartmentsRoot />} />
              <Route path=":departmentId" element={<DepartmentPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </EditModeProvider>
  );
}

export default App;