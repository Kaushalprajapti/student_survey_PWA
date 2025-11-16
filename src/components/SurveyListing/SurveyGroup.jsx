import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SubmissionCard from './SubmissionCard';

export default function SurveyGroup({ surveyTitle, submissions, onView, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-indigo-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-indigo-600" />
          )}
          <h2 className="text-xl font-semibold text-gray-900">{surveyTitle}</h2>
          <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full">
            {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No submissions yet for this survey.
            </div>
          ) : (
            submissions.map((submission) => (
              <SubmissionCard
                key={submission.id}
                submission={submission}
                onView={onView}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

