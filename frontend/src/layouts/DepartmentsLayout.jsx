import { Outlet } from 'react-router-dom';
import SecondarySidebar from '../components/layout/SecondarySidebar';

const DepartmentsLayout = () => {
  return (
    <div className="h-full flex">
      {/* Secondary Sidebar for Departments List */}
      <SecondarySidebar />

      {/* Department Content Area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DepartmentsLayout;
