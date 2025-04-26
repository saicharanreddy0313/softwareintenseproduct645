import { useState, useEffect } from 'react';
import '../../styles/SearchResults.css';

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Optional: Load previous search results if saved
    const storedResults = JSON.parse(localStorage.getItem('searchResults')) || [];
    setResults(storedResults);
  }, []);

  const handleStar = (sip) => {
    const stored = JSON.parse(localStorage.getItem('starredSIPs')) || [];
    const exists = stored.find((item) => item.Id === sip.Id);
    if (!exists) {
      const updated = [...stored, sip];
      localStorage.setItem('starredSIPs', JSON.stringify(updated));
      alert('SIP starred!');
    } else {
      alert('Already starred!');
    }
  };

  return (
    <div className="search-results-container">
      <h2>Search Results</h2>
      
      {results.length === 0 ? (
        <p>No search results found.</p>
      ) : (
        <div className="results-grid">
          {results.map((sip) => (
            <div key={sip.Id} className="result-card">
              <div className="card-header">
                <h3>{sip.name}</h3>
                <button className="star-btn" onClick={() => handleStar(sip)}>⭐</button>
              </div>
              <p><strong>Category:</strong> {sip.category}</p>
              <p><strong>Manufacturer:</strong> {sip.manufacturer}</p>
              <p><strong>Version:</strong> {sip.versions}</p>
              <p><strong>OS:</strong> {sip.operatingSystems}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
