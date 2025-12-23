import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDepartmentById } from '../../services/mockData';
import DeptDevelopment from './DeptDevelopment';
import DeptPublishing from './DeptPublishing';
import DeptGeoContent from './DeptGeoContent';
import DeptComplex from './DeptComplex';
import DeptStandard from './DeptStandard';

/**
 * DepartmentRouter
 * Intelligently routes to the correct department template based on the department's template property
 */
const DepartmentRouter = () => {
  const { departmentId } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartment = async () => {
      setLoading(true);
      const dept = await getDepartmentById(departmentId);
      if (dept) {
        setTemplate(dept.template);
      }
      setLoading(false);
    };

    fetchDepartment();
  }, [departmentId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex p-8 bg-white/40 backdrop-blur-md rounded-full mb-4 animate-pulse">
            <div className="w-16 h-16 bg-slate-200/60 rounded-full" />
          </div>
          <p className="text-slate-500 font-light">טוען...</p>
        </div>
      </div>
    );
  }

  // Route to appropriate template
  switch (template) {
    case 'development':
      return <DeptDevelopment />;
    case 'publishing':
      return <DeptPublishing />;
    case 'geo-content':
      return <DeptGeoContent />;
    case 'complex':
      return <DeptComplex />;
    case 'standard':
      return <DeptStandard />;
    default:
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center glass-card p-12">
            <h2 className="text-2xl font-light text-slate-800 mb-2">תבנית לא נמצאה</h2>
            <p className="text-slate-600">התבנית עבור אגף זה אינה זמינה</p>
          </div>
        </div>
      );
  }
};

export default DepartmentRouter;
