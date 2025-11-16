import QuestionRenderer from './QuestionRenderer';
import { validateAnswer } from '../../utils/validation';

export default function SectionView({ section, answers, onAnswerChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h2>
        {/* {section.learningOutcome && (
          <p className="text-sm text-indigo-600 font-medium mb-2">{section.learningOutcome}</p>
        )} */}
        {/* {section.checklist && (
          <p className="text-sm text-gray-600 italic">{section.checklist}</p>
        )} */}
      </div>

      {section.questions.map((question) => (
        <QuestionRenderer
          key={question.id}
          question={question}
          value={answers[question.id]}
          onChange={onAnswerChange}
          error={errors[question.id]}
          allAnswers={answers}
        />
      ))}
    </div>
  );
}

