import { useState } from 'react';
import { FileText, Phone, Network, Printer, X, User, Mail, MapPin } from 'lucide-react';

const DeptPublishing = () => {
  const [activeModal, setActiveModal] = useState(null);

  const contactsList = [
    { name: 'ראש האגף', role: 'מנהל', phone: '03-1234567', email: 'manager@pub.gov.il', office: 'בניין A, קומה 3' },
    { name: 'מזכירות', role: 'מזכירה', phone: '03-1234568', email: 'secretary@pub.gov.il', office: 'בניין A, קומה 3' },
    { name: 'עורך ראשי', role: 'עריכה', phone: '03-1234569', email: 'editor@pub.gov.il', office: 'בניין A, קומה 2' },
    { name: 'מנהל הפקה', role: 'הפקה', phone: '03-1234570', email: 'production@pub.gov.il', office: 'בניין B, קומה 1' }
  ];

  const hierarchyData = [
    { level: 0, title: 'מנהל האגף', name: 'דר\' יעקב כהן' },
    { level: 1, title: 'מנהל עריכה', name: 'שרה לוי', parent: 0 },
    { level: 1, title: 'מנהל הפקה', name: 'דוד מזרחי', parent: 0 },
    { level: 1, title: 'מנהל הפצה', name: 'רחל אברהם', parent: 0 },
    { level: 2, title: 'עורך בכיר', name: 'משה דהן', parent: 1 },
    { level: 2, title: 'מעצב גרפי', name: 'תמר ישראלי', parent: 2 }
  ];

  const printRequirements = [
    { title: 'טופס בקשת הדפסה', type: 'PDF', size: '120 KB' },
    { title: 'נהלי הדפסת מסמכים', type: 'DOCX', size: '450 KB' },
    { title: 'מפרט טכני להדפסות', type: 'PDF', size: '890 KB' },
    { title: 'תקנון שימוש במדפסות', type: 'PDF', size: '320 KB' }
  ];

  return (
    <div className="h-full overflow-auto p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg">
            <FileText size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-light text-slate-800">אגף הוצאה לאור</h1>
            <p className="text-slate-500 text-lg">פרסומים, עריכה והפקת מסמכים</p>
          </div>
        </div>
      </div>

      {/* Three Large Action Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Contact Details Card */}
        <button
          onClick={() => setActiveModal('contacts')}
          className="group relative h-80 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-90" />
          <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
            <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
              <Phone size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-light mb-3">פרטי התקשרות</h2>
            <p className="text-white/90 text-center leading-relaxed">
              מידע ליצירת קשר עם צוות האגף
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </button>

        {/* Hierarchy Card */}
        <button
          onClick={() => setActiveModal('hierarchy')}
          className="group relative h-80 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-90" />
          <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
            <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
              <Network size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-light mb-3">מבנה ארגוני</h2>
            <p className="text-white/90 text-center leading-relaxed">
              היררכיה וחלוקת תפקידים באגף
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </button>

        {/* Print Requirements Card */}
        <button
          onClick={() => setActiveModal('print')}
          className="group relative h-80 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-90" />
          <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
            <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
              <Printer size={64} strokeWidth={1.5} />
            </div>
            <h2 className="text-3xl font-light mb-3">דרישות הדפסה</h2>
            <p className="text-white/90 text-center leading-relaxed">
              מסמכים, טפסים ונהלי הדפסה
            </p>
          </div>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        </button>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}>
          <div className="glass-card max-w-3xl w-full max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-light text-slate-800">
                {activeModal === 'contacts' && 'פרטי התקשרות'}
                {activeModal === 'hierarchy' && 'מבנה ארגוני'}
                {activeModal === 'print' && 'דרישות הדפסה'}
              </h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 hover:bg-slate-200/50 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {activeModal === 'contacts' && (
                <div className="space-y-4">
                  {contactsList.map((contact, idx) => (
                    <div key={idx} className="bg-white/40 backdrop-blur-sm p-6 rounded-xl hover:bg-white/60 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-full">
                          <User size={24} className="text-blue-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-slate-800 mb-1">{contact.name}</h3>
                          <p className="text-sm text-slate-500 mb-3">{contact.role}</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Phone size={16} />
                              <span>{contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Mail size={16} />
                              <span>{contact.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <MapPin size={16} />
                              <span>{contact.office}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'hierarchy' && (
                <div className="space-y-6">
                  {hierarchyData.map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-white/40 backdrop-blur-sm p-5 rounded-xl hover:bg-white/60 transition-all ${
                        item.level === 0 ? 'border-2 border-purple-500/30' : ''
                      }`}
                      style={{ marginRight: `${item.level * 2}rem` }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          item.level === 0 ? 'bg-purple-500/20' : 'bg-slate-500/10'
                        }`}>
                          <User size={20} className={item.level === 0 ? 'text-purple-500' : 'text-slate-600'} />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{item.title}</h3>
                          <p className="text-sm text-slate-600">{item.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeModal === 'print' && (
                <div className="space-y-3">
                  {printRequirements.map((doc, idx) => (
                    <button
                      key={idx}
                      className="w-full bg-white/40 backdrop-blur-sm p-5 rounded-xl hover:bg-white/60 transition-all text-right"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-500/10 rounded-lg">
                            <FileText size={20} className="text-orange-500" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-800">{doc.title}</h3>
                            <p className="text-sm text-slate-500">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <span className="text-sm text-primary hover:underline">הורד</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeptPublishing;
