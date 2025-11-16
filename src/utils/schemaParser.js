export const parseSurveySchema = (surveyData) => {
  const data = surveyData.surveyData || surveyData;
  
  return {
    title: data.title,
    sections: data.sections.map(section => ({
      id: section.sectionId,
      title: section.title,
      checklist: section.sectionChecklist || section.checklist,
      learningOutcome: section.learningOutcome || '',
      questions: section.questions.map(q => ({
        id: q.questionId,
        text: q.questionText,
        hint: q.hintText || q.questionHintText || '',
        type: q.inputType.toLowerCase(),
        options: q.options || [],
        required: q.isRequired !== false,
        validation: Array.isArray(q.validationRules) ? {} : (q.validationRules || {}),
        visibility: q.visibilityLogic || { enabled: false },
        guide: q.checklistGuide || ''
      }))
    }))
  };
};

export const shouldShowQuestion = (question, allAnswers) => {
  if (!question.visibility || !question.visibility.enabled) {
    return true;
  }

  const targetAnswer = allAnswers[question.visibility.targetQuestion];
  const expectedValue = question.visibility.value;
  const condition = question.visibility.condition;

  if (condition === 'equals') {
    return String(targetAnswer) === String(expectedValue);
  }

  if (condition === 'notEquals') {
    return String(targetAnswer) !== String(expectedValue);
  }

  if (condition === 'contains') {
    return String(targetAnswer || '').includes(String(expectedValue));
  }

  return false;
};

