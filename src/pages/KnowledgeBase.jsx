import { useState } from 'react';
import { Search, BookOpen, Users, Laptop, Briefcase, FileText, Clock, Eye } from 'lucide-react';
import { useEditMode } from '../contexts/EditModeContext';

const KnowledgeBase = () => {
  const { isEditMode } = useEditMode();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'הכל', icon: FileText, color: 'slate' },
    { id: 'hr', label: 'משאבי אנוש', icon: Users, color: 'blue' },
    { id: 'it', label: 'מערכות מידע', icon: Laptop, color: 'purple' },
    { id: 'procedures', label: 'נהלים', icon: Briefcase, color: 'green' },
    { id: 'guides', label: 'מדריכים', icon: BookOpen, color: 'orange' }
  ];

  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'הנחיות לניהול חופשות',
      category: 'hr',
      description: 'מדריך מפורט לניהול בקשות חופשה ואישורן במערכת',
      views: 342,
      lastUpdated: '2024-03-15',
      author: 'שרה כהן'
    },
    {
      id: 2,
      title: 'איפוס סיסמה למערכת CRM',
      category: 'it',
      description: 'הנחיות שלב אחר שלב לאיפוס סיסמה במערכת ניהול הלקוחות',
      views: 567,
      lastUpdated: '2024-03-14',
      author: 'דוד לוי'
    },
    {
      id: 3,
      title: 'נוהל רכש ציוד משרדי',
      category: 'procedures',
      description: 'תהליך אישור והזמנת ציוד משרדי דרך מערכת הרכש',
      views: 198,
      lastUpdated: '2024-03-12',
      author: 'רחל אברהם'
    },
    {
      id: 4,
      title: 'מדריך למערכת הדיווח הכספית',
      category: 'guides',
      description: 'הדרכה מקיפה לשימוש במערכת הדיווח הכספית החדשה',
      views: 423,
      lastUpdated: '2024-03-10',
      author: 'משה דהן'
    },
    {
      id: 5,
      title: 'נוהל בטיחות במידע',
      category: 'procedures',
      description: 'כללי אבטחת מידע וטיפול במידע רגיש בארגון',
      views: 789,
      lastUpdated: '2024-03-08',
      author: 'דוד לוי'
    },
    {
      id: 6,
      title: 'הדרכה למערכת ניהול משימות',
      category: 'guides',
      description: 'מדריך שלב אחר שלב לניהול משימות ופרויקטים במערכת',
      views: 234,
      lastUpdated: '2024-03-05',
      author: 'שרה כהן'
    }
  ]);

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    const colorMap = {
      slate: { bg: 'bg-slate-500', text: 'text-slate-500', badge: 'bg-slate-100 text-slate-700' },
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', badge: 'bg-blue-100 text-blue-700' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-500', badge: 'bg-purple-100 text-purple-700' },
      green: { bg: 'bg-green-500', text: 'text-green-500', badge: 'bg-green-100 text-green-700' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-500', badge: 'bg-orange-100 text-orange-700' }
    };
    return colorMap[category?.color || 'slate'];
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteArticle = (id) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  const handleAddArticle = () => {
    const newArticle = {
      id: Date.now(),
      title: 'מאמר חדש - לחץ לעריכה',
      category: 'guides',
      description: 'תיאור המאמר כאן...',
      views: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      author: 'מחבר'
    };
    setArticles([newArticle, ...articles]);
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed">
          מאגר ידע ארגוני
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          מדריכים, נהלים ומסמכים לעובדי הארגון
        </p>
      </div>

      {/* Search Bar - Glassmorphism */}
      <div className="relative mb-6">
        <div className="relative bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
          <div className="relative flex items-center px-6 py-4">
            <Search size={24} className="text-slate-400 ml-4" />
            <input
              type="text"
              placeholder="חפש במאגר הידע..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent outline-none text-slate-800 placeholder-slate-400 text-lg font-light"
            />
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isActive = selectedCategory === category.id;
          const colors = getCategoryColor(category.id);

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                group px-6 py-3 rounded-full transition-all duration-300
                flex items-center gap-2 font-normal
                ${
                  isActive
                    ? `${colors.bg} text-white shadow-lg scale-105`
                    : 'bg-white/40 backdrop-blur-md text-slate-600 hover:bg-white/60 hover:scale-102'
                }
              `}
            >
              <IconComponent size={18} />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Add New Button (Edit Mode) */}
      {isEditMode && (
        <button
          onClick={handleAddArticle}
          className="mb-6 py-3 px-6 bg-primary/20 backdrop-blur-md border-2 border-dashed border-primary/50 rounded-xl hover:bg-primary/30 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 text-primary font-medium"
        >
          <span className="text-xl">+</span>
          <span>הוסף מאמר חדש</span>
        </button>
      )}

      {/* Articles Grid */}
      <div className="flex-1 overflow-auto">
        {filteredArticles.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-flex p-6 bg-slate-100/40 backdrop-blur-md rounded-full mb-4">
                <Search size={48} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-light">לא נמצאו תוצאות</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => {
              const colors = getCategoryColor(article.category);
              const category = categories.find(c => c.id === article.category);
              const IconComponent = category?.icon || FileText;

              return (
                <div
                  key={article.id}
                  className="group relative bg-white/40 backdrop-blur-md rounded-xl border border-white/60 p-6 hover:bg-white/60 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Delete button (Edit Mode) */}
                  {isEditMode && (
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="absolute top-3 left-3 p-1 text-red-500 hover:bg-red-100 rounded transition-colors z-10"
                      title="מחק מאמר"
                    >
                      ✕
                    </button>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl pointer-events-none" />

                  <div className="relative">
                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`p-2 rounded-lg ${colors.bg}/10`}>
                        <IconComponent size={20} className={colors.text} />
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${colors.badge} font-medium`}>
                        {category?.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-lg font-medium text-slate-800 mb-2 leading-relaxed ${
                        isEditMode ? 'border border-dashed border-slate-300 px-2 py-1 rounded' : ''
                      }`}
                      contentEditable={isEditMode}
                      suppressContentEditableWarning
                    >
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm text-slate-600 mb-4 leading-relaxed ${
                        isEditMode ? 'border border-dashed border-slate-300 px-2 py-1 rounded' : ''
                      }`}
                      contentEditable={isEditMode}
                      suppressContentEditableWarning
                    >
                      {article.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-200/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.lastUpdated}</span>
                        </div>
                      </div>
                      <span className="font-medium">{article.author}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default KnowledgeBase;
