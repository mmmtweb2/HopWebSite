import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { EditModeProvider } from './contexts/EditModeContext';
import CommandPalette from './components/CommandPalette';
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
import DepartmentRouter from './pages/departments/DepartmentRouter';
import SectionLayout from './pages/departments/SectionLayout';

function App() {
  return (
    <AuthProvider>
      <EditModeProvider>
        <BrowserRouter>
          {/* Global Command Palette (Ctrl+K) */}
          <CommandPalette />

          {/* Toast Notifications */}
          <Toaster
            position="top-center"
            richColors
            closeButton
            dir="rtl"
            toastOptions={{
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              },
            }}
          />

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
                <Route path=":departmentId" element={<DepartmentRouter />} />
                <Route path="complex/section/:sectionId" element={<SectionLayout />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </EditModeProvider>
    </AuthProvider>
  );
}

export default App;