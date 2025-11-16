import { X, Download } from 'lucide-react';
import { useState } from 'react';

export default function DetailModal({ submission, onClose }) {
  const [exportFormat, setExportFormat] = useState('json');

  if (!submission) return null;

  const handleExport = () => {
    if (exportFormat === 'json') {
      const dataStr = JSON.stringify(submission, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `survey-${submission.surveyId}-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
            Survey Submission Details
          </h2>
          <div className="flex items-center gap-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="input-field text-sm py-1"
            >
              <option value="json">Export as JSON</option>
            </select>
            <button
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2 px-3"
              aria-label="Export submission"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6 space-y-2">
            <div>
              <span className="font-semibold text-gray-700">Survey Title:</span>{' '}
              <span className="text-gray-900">{submission.surveyTitle}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Submitted At:</span>{' '}
              <span className="text-gray-900">
                {new Date(submission.submittedAt).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Submission ID:</span>{' '}
              <span className="text-gray-900 font-mono text-sm">{submission.surveyId}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Answers</h3>
            <div className="space-y-4">
              {Object.entries(submission.answers || {}).map(([key, value]) => (
                <div key={key} className="border-b border-gray-100 pb-3">
                  <div className="font-medium text-gray-700 mb-1">{key}</div>
                  <div className="text-gray-900">{String(value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

