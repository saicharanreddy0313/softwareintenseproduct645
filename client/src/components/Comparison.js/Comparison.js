import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import '../../styles/Comparison.css';

const Comparison = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [selectedSIP1, setSelectedSIP1] = useState(null);
  const [selectedSIP2, setSelectedSIP2] = useState(null);
  const [, setLoading1] = useState(false);
  const [, setLoading2] = useState(false);
  const [error, setError] = useState('');

  const fetchSuggestions1 = async (query) => {
    if (!query.trim()) {
      setResults1([]);
      return;
    }
    try {
      setLoading1(true);
      const { data, error } = await supabase
        .from('Cars')
        .select('Id, name, category, manufacturer, versions, operatingSystems')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%,manufacturer.ilike.%${query}%,operatingSystems.ilike.%${query}%`)
        .limit(5);
      if (error) throw error;
      setResults1(data || []);
    } catch (err) {
      console.error('Error fetching suggestions 1:', err.message);
      setError('Error fetching suggestions for SIP 1');
    } finally {
      setLoading1(false);
    }
  };

  const fetchSuggestions2 = async (query) => {
    if (!query.trim()) {
      setResults2([]);
      return;
    }
    try {
      setLoading2(true);
      const { data, error } = await supabase
        .from('Cars')
        .select('Id, name, category, manufacturer, versions, operatingSystems')
        .or(`name.ilike.%${query}%,category.ilike.%${query}%,manufacturer.ilike.%${query}%,operatingSystems.ilike.%${query}%`)
        .limit(5);
      if (error) throw error;
      setResults2(data || []);
    } catch (err) {
      console.error('Error fetching suggestions 2:', err.message);
      setError('Error fetching suggestions for SIP 2');
    } finally {
      setLoading2(false);
    }
  };

  const handleSelect1 = (sip) => {
    setSelectedSIP1(sip);
    setSearchTerm1(sip.name);
    setResults1([]);
  };

  const handleSelect2 = (sip) => {
    setSelectedSIP2(sip);
    setSearchTerm2(sip.name);
    setResults2([]);
  };

  return (
    <div className="comparison-container">
      <h2>Compare Two SIPs</h2>

      <div className="search-boxes">
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm1}
            onChange={(e) => {
              setSearchTerm1(e.target.value);
              fetchSuggestions1(e.target.value);
            }}
            placeholder="Search SIP 1..."
          />
          {results1.length > 0 && (
            <ul className="suggestions-list">
              {results1.map((sip) => (
                <li key={sip.Id} onClick={() => handleSelect1(sip)}>
                  {sip.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm2}
            onChange={(e) => {
              setSearchTerm2(e.target.value);
              fetchSuggestions2(e.target.value);
            }}
            placeholder="Search SIP 2..."
          />
          {results2.length > 0 && (
            <ul className="suggestions-list">
              {results2.map((sip) => (
                <li key={sip.Id} onClick={() => handleSelect2(sip)}>
                  {sip.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Final Comparison */}
      {selectedSIP1 && selectedSIP2 && (
        <div className="sip-comparison">
          {[selectedSIP1, selectedSIP2].map((sip, index) => (
            <div className="sip-card" key={index}>
              <h3>{sip.name}</h3>
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
};

export default Comparison;
