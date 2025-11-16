import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseSurveySchema } from '../utils/schemaParser';
import { validateSection } from '../utils/validation';
import { saveSurvey } from '../utils/db';
import SurveyHeader from '../components/SurveyForm/SurveyHeader';
import SectionView from '../components/SurveyForm/SectionView';
import NavigationButtons from '../components/SurveyForm/NavigationButtons';

export default function SurveyFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyData = location.state?.survey;

  const [parsedSurvey, setParsedSurvey] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!surveyData) {
      navigate('/');
      return;
    }

    const parsed = parseSurveySchema(surveyData);
    setParsedSurvey(parsed);
  }, [surveyData, navigate]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
    
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCurrentSection = () => {
    if (!parsedSurvey) return false;

    const section = parsedSurvey.sections[currentSection];
    const validation = validateSection(section, answers);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (validateCurrentSection()) {
      setCurrentSection((prev) => Math.min(prev + 1, parsedSurvey.sections.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!validateCurrentSection()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await saveSurvey({
        surveyId: crypto.randomUUID(),
        surveyTitle: parsedSurvey.title,
        answers
      });

      navigate('/submissions', { state: { message: 'Survey submitted successfully!' } });
    } catch (error) {
      console.error('Error submitting survey:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!parsedSurvey) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  const currentSectionData = parsedSurvey.sections[currentSection];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SurveyHeader
          title={parsedSurvey.title}
          currentSection={currentSection}
          totalSections={parsedSurvey.sections.length}
        />

        <div className="card">
          <SectionView
            section={currentSectionData}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            errors={errors}
          />

          <NavigationButtons
            currentSection={currentSection}
            totalSections={parsedSurvey.sections.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="mt-4">
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

