# Student Survey PWA

A Progressive Web App (PWA) built with React + Vite that manages dynamic student surveys with weather integration. The application features offline capabilities, local data storage, and a modern, responsive UI.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: IndexedDB (Dexie.js)
- **State Management**: React Hooks
- **Routing**: React Router v6
- **PWA**: Workbox via vite-plugin-pwa
- **Icons**: Lucide React

### Why These Choices?

- **Vite**: Fast dev server, optimized builds, excellent developer experience
- **IndexedDB**: Offline-first approach, no backend needed for prototype
- **Tailwind CSS**: Rapid UI development, small bundle size, utility-first approach
- **Dexie**: Simplified IndexedDB API with promises
- **React Router**: Industry-standard routing solution

## Project Structure

```
student-survey-pwa/
├── public/
│   ├── icon-192.png
│   └── icon-512.png
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── LocationSelector.jsx
│   │   │   ├── RideRecommendation.jsx
│   │   │   ├── SurveyCard.jsx
│   │   │   └── WeatherWidget.jsx
│   │   ├── SurveyForm/
│   │   │   ├── InputTypes/
│   │   │   │   ├── DropdownInput.jsx
│   │   │   │   ├── NumberInput.jsx
│   │   │   │   └── TextInput.jsx
│   │   │   ├── NavigationButtons.jsx
│   │   │   ├── QuestionRenderer.jsx
│   │   │   ├── SectionView.jsx
│   │   │   └── SurveyHeader.jsx
│   │   └── SurveyListing/
│   │       ├── DetailModal.jsx
│   │       ├── FilterBar.jsx
│   │       ├── SubmissionCard.jsx
│   │       └── SurveyGroup.jsx
│   ├── data/
│   │   └── surveySchemas.json
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── SurveyFormPage.jsx
│   │   └── SubmissionsPage.jsx
│   ├── utils/
│   │   ├── db.js
│   │   ├── schemaParser.js
│   │   ├── validation.js
│   │   └── weatherApi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Features

### Screen 1: Dashboard
- **Weather Forecast**: 3-day weather forecast for selected location
- **Ride Recommendation**: Algorithm-based recommendation based on weather conditions
- **Survey Selection**: Three pre-configured survey templates
- **Location Selector**: Choose and save preferred location

### Screen 2: Survey Form
- **Dynamic Form Rendering**: Parses JSON schema and renders forms dynamically
- **Section-based Navigation**: Progress through sections one at a time
- **Visibility Logic**: Questions shown/hidden based on previous answers
- **Real-time Validation**: Validates inputs with helpful error messages
- **Progress Indicator**: Visual progress bar and section counter

### Screen 3: Survey Listing
- **Grouped Display**: Submissions grouped by survey template
- **Search & Filter**: Search submissions and sort by date
- **Detail View**: Modal with full submission details
- **Export**: Export submissions as JSON
- **Delete**: Remove submissions with confirmation

## Database Schema

### IndexedDB Tables

**surveys**
- `id` (auto-increment primary key)
- `surveyId` (UUID)
- `surveyTitle` (string)
- `submittedAt` (ISO timestamp)
- `answers` (JSON object)

**settings**
- `key` (primary key)
- `value` (any type)
- Used for: preferred location, theme preferences, etc.

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Weather API Setup

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the root directory:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
3. The app will use mock data if no API key is provided (for development)

### PWA Icons

Replace the placeholder icons in the `public/` directory:
- `icon-192.png` (192x192 pixels)
- `icon-512.png` (512x512 pixels)

You can generate PWA icons using tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

## Usage

1. **Start the app**: Run `npm run dev`
2. **Select a location**: Choose your city from the dropdown
3. **View weather**: See 3-day forecast and ride recommendation
4. **Start a survey**: Click on any survey card
5. **Fill the form**: Answer questions section by section
6. **Submit**: Review and submit your responses
7. **View submissions**: Navigate to Submissions page to see all responses

## Survey Schema Format

Surveys are defined in `src/data/surveySchemas.json`. Each survey includes:

- `id`: Unique identifier
- `title`: Survey title
- `sections`: Array of sections
  - `sectionId`: Unique section identifier
  - `title`: Section title
  - `sectionChecklist`: Hint text for the section
  - `questions`: Array of questions
    - `questionId`: Unique question identifier
    - `questionText`: The question text
    - `hintText`: Helpful hint for the question
    - `inputType`: "text", "number", or "dropdown"
    - `options`: Array of options (for dropdown)
    - `isRequired`: Boolean
    - `validationRules`: Validation configuration
    - `visibilityLogic`: Conditional display logic
    - `checklistGuide`: Optional guide text

## Visibility Logic

Questions can be conditionally shown based on previous answers:

```json
{
  "visibilityLogic": {
    "enabled": true,
    "targetQuestion": "q_3",
    "condition": "equals",
    "value": "Yes"
  }
}
```

Supported conditions:
- `equals`: Show if answer equals value
- `notEquals`: Show if answer doesn't equal value
- `contains`: Show if answer contains value

## Validation Rules

### Text Validation
```json
{
  "validationRules": {
    "type": "text"
  }
}
```

### Range Validation
```json
{
  "validationRules": {
    "type": "range",
    "min": "0",
    "max": "24"
  }
}
```

## Ride Recommendation Algorithm

The recommendation is based on:
- **Good**: Clear sky, Temp 15-30°C, Wind < 20 km/h
- **Caution**: Light rain, Temp 10-15°C or 30-35°C, Wind 20-25 km/h
- **Not Recommended**: Heavy rain, Storm, Extreme temps (<5°C or >40°C), Wind >25 km/h

## PWA Features

- **Offline Support**: Works without internet connection
- **Installable**: Can be installed on devices
- **Service Worker**: Caches assets and API responses
- **Responsive**: Works on mobile, tablet, and desktop

## Evolution Roadmap

### Phase 1: Current Prototype 
- Basic PWA with offline support
- IndexedDB for local storage
- Single-device usage
- Weather integration
- Dynamic form rendering

### Phase 2: Backend Integration
- Backend: Node.js + Express or Nest.js
- Database: PostgreSQL or MongoDB
- API: RESTful or GraphQL
- Authentication: JWT-based auth
- User roles (student, teacher, admin)

### Phase 3: Enhanced Features
- Real-time sync across devices
- Cloud backup of submissions
- Advanced analytics dashboard
- Bulk export (CSV, Excel)
- Email notifications
- Multi-language support

### Phase 4: Enterprise Ready
- Multi-tenancy (different schools)
- Role-based access control (RBAC)
- Data encryption at rest
- GDPR compliance features
- Audit logs
- Integration with school management systems
- API rate limiting
- Load balancing
- Automated backups
- Monitoring and alerting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Code splitting with React Router
- Lazy loading for routes
- Optimized bundle size
- Service worker caching
- IndexedDB for fast local queries

## Accessibility

- Semantic HTML5 elements
- ARIA labels for form inputs
- Keyboard navigation support
- Focus indicators
- Screen reader compatibility
- Color contrast ratio ≥ 4.5:1

## Development

### Adding a New Survey

1. Edit `src/data/surveySchemas.json`
2. Add your survey object to the `surveys` array
3. Follow the schema format described above
4. The survey will automatically appear on the dashboard

### Customizing Styles

The app uses Tailwind CSS. Custom styles are defined in:
- `src/index.css` - Global styles and component classes
- `tailwind.config.js` - Tailwind configuration

## Development Prompts

1.  "I need to build a Progressive Web App using React and Vite for managing student surveys. The app should have three main screens: a dashboard with weather integration, a dynamic survey form builder, and a submissions listing page. Can you help me set up the project structure with proper routing, state management, and PWA configuration?"

2.  "I'm trying to integrate OpenWeatherMap API to show 3-day weather forecasts. The API returns data in 3-hour intervals, but I need to display one forecast per day. How can I group the forecasts by day and select the most relevant time (like 12 PM) for each day? Also, I want to handle API failures gracefully with mock data fallback."

3. "The search functionality in my submissions page isn't working properly. When I type in the search box, nothing happens. The filter function is defined but it seems like the useEffect dependencies might be wrong. Can you check the SubmissionsPage component and fix the search and sort functionality?"

4.  "I want to add a visual progress indicator to the survey form that shows which section the user is on (e.g., 'Section 2 of 3') and a progress bar showing completion percentage. How do I calculate the progress and update it as users navigate between sections?"

5. "Users should be able to export their survey submissions. I want to add an export button in the detail modal that downloads the submission data as a JSON file. How do I create a downloadable file with a proper filename that includes the survey ID and timestamp?"

6. "The survey schema JSON has a nested structure with 'surveyData' wrapper, and some fields use different names (like 'questionHintText' vs 'hintText'). I need a parser function that normalizes this data and handles both old and new schema formats for backward compatibility. Can you help me create a robust schema parser?"

7. "In the submissions page, I want to group submissions by survey title using accordion-style components. Each group should show the count of submissions and allow expanding/collapsing. How do I implement this with React, and how do I maintain the expanded state for each group?"

8. "After a user completes a survey, I need to validate all sections, generate a UUID for the submission, save it to IndexedDB with a timestamp, and then redirect to the submissions page with a success message. How do I handle this flow properly, especially error cases where the save might fail?"

9. "I'm getting an error: 'Cannot apply unknown utility class bg-gray-50. Are you using CSS modules or similar and missing @reference?' when building my project. The error says Tailwind CSS v4 requires a different PostCSS plugin. I installed tailwindcss@^4.1.17 but the build is failing. How do I fix this - should I downgrade to v3 or install @tailwindcss/postcss?"

10. "I'm getting a React Hook dependency warning: 'React Hook useEffect has a missing dependency: filterAndGroupSubmissions. Either include it or remove the dependency array.' But when I add it, it causes an infinite loop because the function is recreated on every render. How do I fix this without causing performance issues?"

11. "IndexedDB is throwing an error: 'Failed to execute 'transaction' on 'IDBDatabase': The database connection is closing.' This happens when I try to save a survey submission. The error occurs intermittently, especially when the user submits quickly or navigates away. How do I handle database connection errors and ensure data is saved reliably?"

12. "When I navigate to the survey form page, I get an error: 'Cannot read properties of undefined (reading 'sections')'. The error happens in SurveyFormPage when trying to parse the survey schema. It seems like the survey data isn't being passed correctly from the Dashboard page via React Router state. How do I fix the routing and ensure the survey data is available?"

13. "I need to make sure the survey form looks good on mobile devices. The form has multiple sections with questions, and I want to ensure touch-friendly buttons (minimum 44px height), readable font sizes, and proper spacing. Can you review the form components and suggest improvements for mobile responsiveness?"
