import { useState } from 'react';
import WeatherWidget from '../components/Dashboard/WeatherWidget';
import RideRecommendation from '../components/Dashboard/RideRecommendation';
import SurveyCard from '../components/Dashboard/SurveyCard';
import LocationSelector from '../components/Dashboard/LocationSelector';
import surveySchemas from '../data/surveySchemas.json';

export default function DashboardPage() {
  const [location, setLocation] = useState('Ahmedabad');

  const surveys = surveySchemas.surveys.map((item, index) => ({
    id: item.surveyData?.title?.toLowerCase().replace(/\s+/g, '-') || `survey-${index}`,
    ...item.surveyData
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Survey Dashboard</h1>
          <p className="text-gray-600">Select a survey to get started</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <LocationSelector onLocationChange={setLocation} />
            <WeatherWidget location={location} />
          </div>
          <div>
            <RideRecommendation location={location} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Surveys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.map((survey) => (
              <SurveyCard key={survey.id} survey={survey} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

