// Weather API integration
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('data', data);

    // Process to get 3-day forecast
    const forecasts = [];
    const uniqueDays = new Set();

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      if (!uniqueDays.has(dateKey) && uniqueDays.size < 3) {
        uniqueDays.add(dateKey);
        forecasts.push({
          date: dateKey,
          dateObj: date,
          temp: Math.round(item.main.temp),
          tempMin: Math.round(item.main.temp_min),
          tempMax: Math.round(item.main.temp_max),
          condition: item.weather[0].main,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          windSpeed: item.wind?.speed ? Math.round(item.wind.speed * 3.6) : 0 // Convert m/s to km/h
        });
      }
    });

    return forecasts;
  } catch (error) {
    console.error('Weather API error:', error);
    // Return mock data for development
    // return getMockWeatherData(city);
  }
};

// Mock weather data for development/testing
// const getMockWeatherData = (city) => {
//   const today = new Date();
//   const forecasts = [];
  
//   for (let i = 0; i < 3; i++) {
//     const date = new Date(today);
//     date.setDate(date.getDate() + i);
//     forecasts.push({
//       date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
//       dateObj: date,
//       temp: 20 + Math.floor(Math.random() * 10),
//       tempMin: 15 + Math.floor(Math.random() * 5),
//       tempMax: 25 + Math.floor(Math.random() * 5),
//       condition: ['Clear', 'Clouds', 'Rain'][Math.floor(Math.random() * 3)],
//       description: 'Partly cloudy',
//       icon: '01d',
//       windSpeed: 10 + Math.floor(Math.random() * 15)
//     });
//   }
  
//   return forecasts;
// };

export const getRideRecommendation = (weatherData) => {
  // weatherData = [];
  console.log('weatherData', weatherData);
  if (!weatherData || weatherData.length === 0) {
    return { status: 'unknown', message: 'Weather data unavailable', color: 'gray' };
  }

  const today = weatherData[0];
  const { temp, condition, windSpeed } = today;

  const conditionLower = condition.toLowerCase();

  // Bad conditions - Not Recommended
  if (conditionLower.includes('storm') || conditionLower.includes('heavy rain') || 
      conditionLower.includes('thunderstorm') || conditionLower.includes('snow')) {
    return { 
      status: 'not-recommended', 
      message: 'Not safe to ride - Severe weather conditions', 
      color: 'red' 
    };
  }

  // Extreme temperatures
  if (temp < 5 || temp > 40) {
    return { 
      status: 'not-recommended', 
      message: 'Extreme temperature - Not recommended', 
      color: 'red' 
    };
  }

  // High wind
  if (windSpeed > 25) {
    return { 
      status: 'caution', 
      message: 'Strong winds - Be careful', 
      color: 'yellow' 
    };
  }

  // Caution conditions
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return { 
      status: 'caution', 
      message: 'Light rain - Use caution', 
      color: 'yellow' 
    };
  }

  if (temp < 10 || temp > 35) {
    return { 
      status: 'caution', 
      message: 'Temperature outside ideal range', 
      color: 'yellow' 
    };
  }

  // Good conditions
  if (temp >= 15 && temp <= 30 && !conditionLower.includes('rain') && windSpeed < 20) {
    return { 
      status: 'good', 
      message: 'Great weather for riding!', 
      color: 'green' 
    };
  }

  // Default caution
  return { 
    status: 'caution', 
    message: 'Be careful and check conditions', 
    color: 'yellow' 
  };
};

