export const validateAnswer = (answer, rules, isRequired) => {
  // Check required field
  if (isRequired && (!answer || (typeof answer === 'string' && answer.trim() === ''))) {
    return { valid: false, error: 'This field is required' };
  }

  if (!isRequired && (!answer || (typeof answer === 'string' && answer.trim() === ''))) {
    return { valid: true, error: null };
  }

  if (rules && rules.type === 'range') {
    const num = parseFloat(answer);
    if (isNaN(num)) {
      return { valid: false, error: 'Please enter a valid number' };
    }
    const min = parseFloat(rules.min);
    const max = parseFloat(rules.max);
    if (num < min || num > max) {
      return { valid: false, error: `Value must be between ${min} and ${max}` };
    }
  }

  if (rules && rules.type === 'text') {
    if (typeof answer !== 'string' || answer.trim().length === 0) {
      if (isRequired) {
        return { valid: false, error: 'Please enter text' };
      }
    }
  }

  return { valid: true, error: null };
};

export const validateSection = (section, answers) => {
  const errors = {};
  let isValid = true;

  section.questions.forEach(question => {
    const answer = answers[question.id];
    const validation = validateAnswer(answer, question.validation, question.required);
    
    if (!validation.valid) {
      errors[question.id] = validation.error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

