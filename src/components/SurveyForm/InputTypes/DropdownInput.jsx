export default function DropdownInput({ question, value, onChange, error }) {
  return (
    <div>
      <select
        id={question.id}
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        className={`input-field ${error ? 'border-red-500' : ''}`}
        required={question.required}
        aria-required={question.required}
        aria-invalid={!!error}
        aria-describedby={error ? `${question.id}-error` : undefined}
      >
        <option value="">Select an option</option>
        {question.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p id={`${question.id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

