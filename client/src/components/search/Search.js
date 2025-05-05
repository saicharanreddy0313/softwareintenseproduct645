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
        .from('products')
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
        .from('products')
        .select(`
          id, name, Category, manufacturer, Versions, operating_systems, price,
          product_launch_year, firmware_stack, connectivity_options, hardware_specifications,
          supports_ota, software_components_used, power_specs, linked_dependencies,
          certifications_met, official_site, external_reviews, available_markets
        `)
        .or(
          `name.ilike.%${term}%,` +
          `Category.ilike.%${term}%,` +
          `manufacturer.ilike.%${term}%,` +
          `operating_systems.ilike.%${term}%`
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

  const handleStar = (sip) => {
    const stored = JSON.parse(localStorage.getItem('starredSIPs')) || [];
    const exists = stored.find(item => item.id === sip.id);
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
          placeholder="Search products (e.g., 'Tesla' or 'Fitbit')"
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
          <div key={product.id} className="product-card">
            <div className="card-header">
              <h3>{product.name}</h3>
              <button className="star-btn" onClick={() => handleStar(product)}>⭐</button>
            </div>
            <div className="product-meta">
              <span><strong>Category:</strong> {product.Category}</span>
              <span><strong>Manufacturer:</strong> {product.manufacturer}</span>
              <span><strong>Version:</strong> {product.Versions}</span>
              <span><strong>OS:</strong> {product.operating_systems}</span>
              <span><strong>Price:</strong> ${product.price}</span>
              <span><strong>Year:</strong> {product.product_launch_year}</span>
              <span><strong>Firmware:</strong> {product.firmware_stack}</span>
              <span><strong>Connectivity:</strong> {product.connectivity_options}</span>
              <span><strong>Specs:</strong> {product.hardware_specifications}</span>
              <span><strong>OTA:</strong> {product.supports_ota ? 'Yes' : 'No'}</span>
              <span><strong>Software:</strong> {product.software_components_used}</span>
              <span><strong>Power:</strong> {product.power_specs}</span>
              <span><strong>Dependencies:</strong> {product.linked_dependencies}</span>
              <span><strong>Certifications:</strong> {product.certifications_met}</span>
              <span><strong>Markets:</strong> {product.available_markets}</span>
              <span><a href={product.official_site} target="_blank" rel="noreferrer">Official Site</a></span>
              <span><a href={product.external_reviews} target="_blank" rel="noreferrer">Review</a></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
