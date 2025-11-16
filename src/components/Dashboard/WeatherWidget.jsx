import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import { getWeatherForecast } from '../../utils/weatherApi';

export default function WeatherWidget({ location }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await getWeatherForecast(location);
        console.log('data', data);
        if (data && data.length > 0) {
          setForecast(data);
        } else {
          setError('Unable to fetch weather data');
        }
      } catch (err) {
        setError('Failed to load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('clear') || conditionLower.includes('sun')) {
      return <Sun className="w-8 h-8 text-yellow-500" />;
    }
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    }
    if (conditionLower.includes('wind')) {
      return <Wind className="w-8 h-8 text-gray-500" />;
    }
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Weather Forecast</h2>
        <div className="text-red-600 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Weather Forecast (Next 3 Days)</h2>
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-center gap-4">
              {getWeatherIcon(day.condition)}
              <div>
                <div className="font-medium text-gray-900">{day.date}</div>
                <div className="text-sm text-gray-600">{day.description}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{day.temp}°C</div>
              <div className="text-sm text-gray-600">
                {day.tempMin}° / {day.tempMax}°
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Wind: {day.windSpeed} km/h
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

