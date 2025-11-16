import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { getWeatherForecast, getRideRecommendation } from '../../utils/weatherApi';

export default function RideRecommendation({ location }) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!location) return;
      
      setLoading(true);
      try {
        const weatherData = await getWeatherForecast(location);
        const rec = getRideRecommendation(weatherData);
        setRecommendation(rec);
      } catch (err) {
        console.error(err);
        setRecommendation({
          status: 'unknown',
          message: 'Unable to determine recommendation',
          color: 'gray'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [location]);

  const getStatusIcon = () => {
    if (!recommendation) return null;
    
    switch (recommendation.status) {
      case 'good':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'caution':
        return <AlertTriangle className="w-8 h-8 text-yellow-600" />;
      case 'not-recommended':
        return <XCircle className="w-8 h-8 text-red-600" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    if (!recommendation) return 'bg-gray-100 border-gray-300';
    
    switch (recommendation.color) {
      case 'green':
        return 'bg-green-50 border-green-200';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200';
      case 'red':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Ride Recommendation</h2>
        <div className="animate-pulse">
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Ride Recommendation</h2>
      {recommendation && (
        <div className={`p-6 rounded-lg border-2 ${getStatusColor()} flex items-center gap-4`}>
          {getStatusIcon()}
          <div className="flex-1">
            <div className="font-semibold text-lg text-gray-900 mb-1">
              {recommendation.status === 'good' && 'Safe to Ride'}
              {recommendation.status === 'caution' && 'Use Caution'}
              {recommendation.status === 'not-recommended' && 'Not Recommended'}
              {recommendation.status === 'unknown' && 'Unable to Determine'}
            </div>
            <div className="text-gray-700">{recommendation.message}</div>
          </div>
        </div>
      )}
    </div>
  );
}

