import { useState } from 'react';
import { Users, Phone, Building2 } from 'lucide-react';
import { getContactsData } from '../services/newMockData';

const Contacts = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const contactsData = getContactsData();

  const departments = [
    { id: 'hr', label: 'משאבי אנוש', color: 'from-slate-700 to-slate-800' },
    { id: 'it', label: 'מערכות מידע', color: 'from-slate-700 to-slate-800' },
    { id: 'logistics', label: 'לוגיסטיקה', color: 'from-slate-700 to-slate-800' },
    { id: 'finance', label: 'כספים', color: 'from-slate-700 to-slate-800' },
    { id: 'operations', label: 'תפעול', color: 'from-slate-700 to-slate-800' },
    { id: 'marketing', label: 'שיווק', color: 'from-slate-700 to-slate-800' }
  ];

  const selectedData = selectedDept ? contactsData[selectedDept] : null;

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed flex items-center gap-3">
          <Users size={40} className="text-primary" />
          <span>ספר אנשי קשר</span>
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          מספרי טלפון ואנשי קשר לכל המחלקות
        </p>
      </div>

      {/* Department Buttons */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
          <Building2 size={20} />
          <span>בחר מחלקה</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {departments.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`group relative h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                selectedDept === dept.id
                  ? 'scale-105 shadow-2xl ring-4 ring-primary'
                  : 'hover:scale-102 hover:shadow-lg'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-90`} />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-3">
                <Building2 size={24} className="mb-2" />
                <span className="text-sm font-medium text-center">{dept.label}</span>
                {selectedDept === dept.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contacts Table */}
      {selectedData && (
        <div className="flex-1 overflow-auto animate-fadeIn">
          <div className="glass-card p-6">
            <h2 className="text-2xl font-light text-slate-800 mb-6 flex items-center gap-2">
              <Phone size={24} className="text-primary" />
              <span>{selectedData.dept}</span>
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="text-right py-3 px-4 font-medium text-slate-700">מדור</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-700">תפקיד</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-700">מספר</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.groups.map((group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                      {/* Visual spacing before group header (except first) */}
                      {groupIndex > 0 && (
                        <>
                          <tr className="h-4"><td colSpan="3"></td></tr>
                          <tr className="h-4"><td colSpan="3"></td></tr>
                        </>
                      )}

                      {/* Group Header */}
                      <tr className="bg-primary/10">
                        <td colSpan="3" className="py-3 px-4 font-semibold text-primary">
                          {group.title}
                        </td>
                      </tr>

                      {/* Group Contacts */}
                      {group.contacts.map((contact, contactIndex) => (
                        <tr
                          key={contactIndex}
                          className="border-b border-slate-200/50 hover:bg-white/60 transition-colors"
                        >
                          <td className="py-3 px-4 text-slate-700">{contact.section}</td>
                          <td className="py-3 px-4 text-slate-700">{contact.role}</td>
                          <td className="py-3 px-4 text-slate-700 font-mono">
                            <a
                              href={`tel:${contact.number}`}
                              className="hover:text-primary transition-colors flex items-center gap-2"
                            >
                              <Phone size={14} />
                              {contact.number}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!selectedData && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Users size={64} className="mx-auto mb-4 text-slate-300" />
            <p className="text-slate-400 font-light">בחר מחלקה לצפייה באנשי קשר</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

// Import React for Fragment
import React from 'react';

export default Contacts;
