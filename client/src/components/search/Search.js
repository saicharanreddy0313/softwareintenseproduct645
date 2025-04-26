import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import '../../styles/Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = async (value) => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('Cars')
        .select('name')
        .ilike('name', `%${value}%`)
        .limit(10);

      if (error) throw error;
      setSuggestions(data || []);
    } catch (err) {
      console.error('Suggestion fetch error:', err);
    }
  };

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setError('');
    try {
      const { data, error: sbError } = await supabase
        .from('Cars')
        .select('Id, name, category, manufacturer, versions, operatingSystems')
        .or(
          `name.ilike.%${term}%,` +
          `category.ilike.%${term}%,` +
          `manufacturer.ilike.%${term}%,` +
          `operatingSystems.ilike.%${term}%`
        );

      if (sbError) throw sbError;
      setResults(data || []);
      setSuggestions([]);
      setShowSuggestions(false);
    } catch (err) {
      setError('Error fetching results.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(true);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
      setShowSuggestions(false);
    }
  };

  // ⭐ NEW: handleStar function to save into localStorage
  const handleStar = (sip) => {
    const stored = JSON.parse(localStorage.getItem('starredSIPs')) || [];
    const exists = stored.find(item => item.Id === sip.Id);
    if (!exists) {
      const updated = [...stored, sip];
      localStorage.setItem('starredSIPs', JSON.stringify(updated));
      alert('⭐ SIP starred!');
    } else {
      alert('Already starred');
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Search products (e.g., 'Toyota' or 'Honda')"
        />
        <button onClick={() => handleSearch(searchTerm)} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestion-dropdown">
            {suggestions.map((item, index) => (
              <li key={index} onMouseDown={() => handleSuggestionClick(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="results-grid">
        {results.map((product) => (
          <div key={product.Id} className="product-card">
            <div className="card-header">
              <h3>{product.name}</h3>
              {/* ⭐ Star button */}
              <button className="star-btn" onClick={() => handleStar(product)}>⭐</button>
            </div>
            <div className="product-meta">
              <span className="category">Category: {product.category}</span>
              <span className="manufacturer">Manufacturer: {product.manufacturer}</span>
              <span className="version">Version: {product.versions}</span>
              <span className="os">OS: {product.operatingSystems}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
