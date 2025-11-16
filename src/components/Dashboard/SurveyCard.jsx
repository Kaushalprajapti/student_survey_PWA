import { Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SurveyCard({ survey }) {
  const navigate = useNavigate();
  
  const totalSections = survey.sections?.length || 0;
  const totalQuestions = survey.sections?.reduce((sum, section) => 
    sum + (section.questions?.length || 0), 0) || 0;
  
  // Estimate time: ~2 minutes per question
  const estimatedTime = Math.ceil(totalQuestions * 2);

  const handleClick = () => {
    navigate(`/survey/${survey.id}`, { state: { survey } });
  };

  return (
    <div
      onClick={handleClick}
      className="card cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-indigo-300"
      role="button"
      tabIndex={0}
      // onKeyDown={(e) => {
      //   if (e.key === 'Enter' || e.key === ' ') {
      //     handleClick();
      //   }
      // }}
      aria-label={`Start ${survey.title}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-indigo-100 rounded-lg">
          <FileText className="w-6 h-6 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {survey.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{totalSections} section{totalSections !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~{estimatedTime} min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

