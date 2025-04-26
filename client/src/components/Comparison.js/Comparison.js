import { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import '../../styles/Comparison.css';

const Comparison = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [, setResults1] = useState([]);
  const [, setResults2] = useState([]);
  const [selectedSIP1, setSelectedSIP1] = useState(null);
  const [selectedSIP2, setSelectedSIP2] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');

  const handleSearch1 = async () => {
    if (!searchTerm1.trim()) {
      setError('Please enter search term for SIP 1');
      return;
    }
    try {
      setLoading1(true);
      const { data, error } = await supabase
        .from('Cars')
        .select('Id, name, category, manufacturer, versions, operatingSystems')
        .or(`name.ilike.%${searchTerm1}%,category.ilike.%${searchTerm1}%,manufacturer.ilike.%${searchTerm1}%,operatingSystems.ilike.%${searchTerm1}%`);
      if (error) throw error;
      setResults1(data || []);
      if (data && data.length > 0) {
        setSelectedSIP1(data[0]); // 🛠 Automatically select first result
      } else {
        setSelectedSIP1(null);
      }
    } catch (err) {
      console.error('Error searching SIP 1:', err.message);
      setError('Error searching SIP 1');
    } finally {
      setLoading1(false);
    }
  };

  const handleSearch2 = async () => {
    if (!searchTerm2.trim()) {
      setError('Please enter search term for SIP 2');
      return;
    }
    try {
      setLoading2(true);
      const { data, error } = await supabase
        .from('Cars')
        .select('Id, name, category, manufacturer, versions, operatingSystems')
        .or(`name.ilike.%${searchTerm2}%,category.ilike.%${searchTerm2}%,manufacturer.ilike.%${searchTerm2}%,operatingSystems.ilike.%${searchTerm2}%`);
      if (error) throw error;
      setResults2(data || []);
      if (data && data.length > 0) {
        setSelectedSIP2(data[0]); // 🛠 Automatically select first result
      } else {
        setSelectedSIP2(null);
      }
    } catch (err) {
      console.error('Error searching SIP 2:', err.message);
      setError('Error searching SIP 2');
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="comparison-container">
      <h2>Compare Two SIPs</h2>

      <div className="search-boxes">
        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm1}
            onChange={(e) => setSearchTerm1(e.target.value)}
            placeholder="Search SIP 1..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch1()}
          />
          <button onClick={handleSearch1} disabled={loading1}>
            {loading1 ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="search-input-group">
          <input
            type="text"
            value={searchTerm2}
            onChange={(e) => setSearchTerm2(e.target.value)}
            placeholder="Search SIP 2..."
            onKeyPress={(e) => e.key === 'Enter' && handleSearch2()}
          />
          <button onClick={handleSearch2} disabled={loading2}>
            {loading2 ? 'Searching...' : 'Search'}
          </button>
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
