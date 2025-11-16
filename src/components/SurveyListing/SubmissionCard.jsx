import { Calendar, Eye, Trash2 } from 'lucide-react';

export default function SubmissionCard({ submission, onView, onDelete }) {
  const submittedDate = new Date(submission.submittedAt);
  const formattedDate = submittedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Get preview of key answers (first few questions)
  const previewAnswers = Object.entries(submission.answers || {})
    .slice(0, 3)
    .map(([key, value]) => ({ key, value }));

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
      </div>

      {previewAnswers.length > 0 && (
        <div className="mb-4 space-y-2">
          {previewAnswers.map(({ key, value }) => (
            <div key={key} className="text-sm">
              <span className="font-medium text-gray-700">{key}:</span>{' '}
              <span className="text-gray-600">{String(value).substring(0, 50)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onView(submission)}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View Details
        </button>
        <button
          onClick={() => onDelete(submission.id)}
          className="btn-secondary flex items-center justify-center gap-2 px-4"
          aria-label="Delete submission"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

