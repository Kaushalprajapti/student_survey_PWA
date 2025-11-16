export default function SurveyHeader({ title, currentSection, totalSections }) {
  const progress = totalSections > 0 ? ((currentSection + 1) / totalSections) * 100 : 0;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Section {currentSection + 1} of {totalSections}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>
  );
}

