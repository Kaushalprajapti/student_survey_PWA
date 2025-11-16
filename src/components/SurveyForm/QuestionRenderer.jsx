import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TextInput from './InputTypes/TextInput';
import NumberInput from './InputTypes/NumberInput';
import DropdownInput from './InputTypes/DropdownInput';
import { shouldShowQuestion } from '../../utils/schemaParser';

export default function QuestionRenderer({ question, value, onChange, error, allAnswers }) {
  const [showGuide, setShowGuide] = useState(false);

  // Check visibility logic
  if (!shouldShowQuestion(question, allAnswers)) {
    return null;
  }

  const renderInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextInput
            question={question}
            value={value}
            onChange={onChange}
            error={error}
          />
        );
      case 'number':
        return (
          <NumberInput
            question={question}
            value={value}
            onChange={onChange}
            error={error}
          />
        );
      case 'dropdown':
        return (
          <DropdownInput
            question={question}
            value={value}
            onChange={onChange}
            error={error}
          />
        );
      default:
        return (
          <div className="text-red-600">Unsupported input type: {question.type}</div>
        );
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor={question.id} className="block text-base font-medium text-gray-900 mb-2">
        {question.text}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {/* {question.hint && (
        <p className="text-sm text-gray-600 italic mb-3">{question.hint}</p>
      )} */}

      {renderInput()}

      {question.guide && (
        <div className="mt-4">
          {/* <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            aria-expanded={showGuide}
          >
            {showGuide ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Checklist Guide
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Checklist Guide
              </>
            )}
          </button> */}
          {showGuide && (
            <div className="mt-2 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="text-sm text-gray-700 whitespace-pre-line">
                {question.guide}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

