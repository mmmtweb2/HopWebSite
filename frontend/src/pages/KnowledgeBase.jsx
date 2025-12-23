import { useState } from 'react';
import SmartFilterLayout from '../components/SmartFilterLayout';
import { getKnowledgeBaseData } from '../services/newMockData';
import { BookOpen, Download, Eye, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import Modal from '../components/Modal';

const KnowledgeBase = () => {
  const articles = getKnowledgeBaseData();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewArticle = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const renderArticleCard = (article, index) => {
    const getTagColor = (tag) => {
      const colors = {
        'נוהל': 'bg-blue-500/20 text-blue-600 border-blue-500',
        'הדרכה': 'bg-green-500/20 text-green-600 border-green-500',
        'מדריך': 'bg-purple-500/20 text-purple-600 border-purple-500',
        'עדכון': 'bg-yellow-500/20 text-yellow-600 border-yellow-500',
        'FAQ': 'bg-indigo-500/20 text-indigo-600 border-indigo-500'
      };
      return colors[tag] || 'bg-slate-500/20 text-slate-600 border-slate-500';
    };

    return (
      <div
        key={article.id}
        className="glass-card p-6 border-r-4"
        style={{
          animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
          borderRightColor: article.tag === 'נוהל' ? '#3b82f6' :
                            article.tag === 'הדרכה' ? '#22c55e' :
                            article.tag === 'מדריך' ? '#a855f7' : '#10b981'
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-primary flex-shrink-0" />
              <h3 className="text-lg font-medium text-slate-800 leading-relaxed">
                {article.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FileText size={12} />
              <span>{article.date}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTagColor(article.tag)}`}>
            {article.tag}
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {article.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 flex-wrap">
          <span className="px-2 py-1 bg-slate-100 rounded">
            {article.timeCategory === 'daily' ? 'יומי' :
             article.timeCategory === 'weekly' ? 'שבועי' : 'תקופתי'}
          </span>
          <span className="px-2 py-1 bg-slate-100 rounded">
            {article.level === 'management' ? 'הנהלה' :
             article.level === 'regional' ? 'אזורי' : 'תת-אזורי'}
          </span>
          {article.area && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded">
              {article.area === 'north' ? 'צפון' :
               article.area === 'center' ? 'מרכז' : 'דרום'}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Button size="sm" className="flex-1" onClick={() => handleViewArticle(article)}>
            <Eye size={16} />
            <span>צפייה</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Download size={16} />
            <span>הורדה</span>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <SmartFilterLayout
        title="מאגר ידע"
        description="מסמכים, נהלים ומדריכים לכל הרמות והאזורים"
        data={articles}
        renderCard={renderArticleCard}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedArticle && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
            <p className="text-slate-600 mb-4">{selectedArticle.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{selectedArticle.date}</span>
              <span>{selectedArticle.tag}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default KnowledgeBase;