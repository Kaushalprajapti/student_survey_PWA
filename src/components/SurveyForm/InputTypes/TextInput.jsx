export default function TextInput({ question, value, onChange, error }) {
  return (
    <div>
      <input
        type="text"
        id={question.id}
        value={value || ''}
        onChange={(e) => onChange(question.id, e.target.value)}
        onBlur={() => {}} // Validation handled at form level
        className={`input-field ${error ? 'border-red-500' : ''}`}
        required={question.required}
        aria-required={question.required}
        aria-invalid={!!error}
        aria-describedby={error ? `${question.id}-error` : undefined}
      />
      {error && (
        <p id={`${question.id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

