import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllSurveys, deleteSurvey } from '../utils/db';
import SurveyGroup from '../components/SurveyListing/SurveyGroup';
import DetailModal from '../components/SurveyListing/DetailModal';
import FilterBar from '../components/SurveyListing/FilterBar';

export default function SubmissionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submissions, setSubmissions] = useState([]);
  const [groupedSubmissions, setGroupedSubmissions] = useState({});
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubmissions();
    
    // Show success message if redirected from form submission
    if (location.state?.message) {
      alert(location.state.message);
    }
  }, []);

  useEffect(() => {
    filterAndGroupSubmissions();
  }, [submissions, searchTerm, sortBy]);

  const loadSubmissions = async () => {
    try {
      const data = await getAllSurveys();
      setSubmissions(data);
    } catch (error) {
      console.error('Error loading submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndGroupSubmissions = () => {
    let filtered = [...submissions];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((sub) => {
        const searchableText = JSON.stringify(sub.answers || {}).toLowerCase();
        return (
          sub.surveyTitle.toLowerCase().includes(searchLower) ||
          searchableText.includes(searchLower)
        );
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.submittedAt);
      const dateB = new Date(b.submittedAt);
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Group by survey title
    const grouped = {};
    filtered.forEach((sub) => {
      if (!grouped[sub.surveyTitle]) {
        grouped[sub.surveyTitle] = [];
      }
      grouped[sub.surveyTitle].push(sub);
    });

    setGroupedSubmissions(grouped);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteSurvey(id);
        await loadSubmissions();
      } catch (error) {
        console.error('Error deleting submission:', error);
        alert('Failed to delete submission');
      }
    }
  };

  const handleView = (submission) => {
    setSelectedSubmission(submission);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Survey Submissions</h1>
            <p className="text-gray-600">View and manage your survey responses</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {Object.keys(groupedSubmissions).length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No submissions found</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Start a Survey
            </button>
          </div>
        ) : (
          <div>
            {Object.entries(groupedSubmissions).map(([title, subs]) => (
              <SurveyGroup
                key={title}
                surveyTitle={title}
                submissions={subs}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {selectedSubmission && (
          <DetailModal
            submission={selectedSubmission}
            onClose={() => setSelectedSubmission(null)}
          />
        )}
      </div>
    </div>
  );
}

