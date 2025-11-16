import { useState, useEffect } from 'react';
import { getSetting, setSetting } from '../../utils/db';

const LOCATIONS = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Hyderabad',
  'Ahmedabad',
  'Kolkata',
  'Jaipur',
  'Lucknow',
  'Surat',
  'Pune',
  'Nagpur',
  'Bhopal',
  'Indore',
  'Thane',
  'Rajkot',
  'Vadodara',
  'Bhavnagar',
  'Jamnagar',
];

export default function LocationSelector({ onLocationChange }) {
  const [location, setLocation] = useState('Ahmedabad');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocation = async () => {
      const savedLocation = await getSetting('preferredLocation');
      if (savedLocation) {
        setLocation(savedLocation);
        onLocationChange(savedLocation);
      } else {
        onLocationChange(location);
      }
      setLoading(false);
    };
    loadLocation();
  }, []);

  const handleChange = async (e) => {
    // console.log('handleChange', e.target.value);
    const newLocation = e.target.value;
    setLocation(newLocation);
    await setSetting('preferredLocation', newLocation);
    onLocationChange(newLocation);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
        Select Location
      </label>
      <select
        id="location"
        value={location}
        onChange={handleChange}
        className="input-field"
        aria-label="Select location for weather forecast"
      >
        {LOCATIONS.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}

