export default function NavigationButtons({
  currentSection,
  totalSections,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting
}) {
  const isFirstSection = currentSection === 0;
  const isLastSection = currentSection === totalSections - 1;

  const handleNext = () => {
    if (isLastSection) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
      {!isFirstSection && (
        <button
          type="button"
          onClick={onPrevious}
          className="btn-secondary flex-1"
          disabled={isSubmitting}
        >
          Previous
        </button>
      )}
      <button
        type="button"
        onClick={handleNext}
        className="btn-primary flex-1"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : isLastSection ? 'Submit Survey' : 'Next'}
      </button>
    </div>
  );
}

