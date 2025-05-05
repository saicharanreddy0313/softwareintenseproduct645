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
  const [error, setError] = useState('');

  const fetchSuggestions = async (query, setResults) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, Category, manufacturer, Versions, operating_systems, price, product_launch_year, firmware_stack, connectivity_options, hardware_specifications, supports_ota, software_components_used, power_specs, linked_dependencies, certifications_met, official_site, external_reviews, available_markets')
        .or(`name.ilike.%${query}%,Category.ilike.%${query}%,manufacturer.ilike.%${query}%,operating_systems.ilike.%${query}%`)
        .limit(5);

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      console.error('Error fetching suggestions:', err.message);
      setError('Error fetching suggestions.');
    }
  };

  const handleSelect = (sip, setSelected, setSearchTerm, setResults) => {
    setSelected(sip);
    setSearchTerm(sip.name);
    setResults([]);
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
              fetchSuggestions(e.target.value, setResults1);
            }}
            placeholder="Search SIP 1..."
          />
          {results1.length > 0 && (
            <ul className="suggestions-list">
              {results1.map((sip) => (
                <li key={sip.id} onClick={() => handleSelect(sip, setSelectedSIP1, setSearchTerm1, setResults1)}>
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
              fetchSuggestions(e.target.value, setResults2);
            }}
            placeholder="Search SIP 2..."
          />
          {results2.length > 0 && (
            <ul className="suggestions-list">
              {results2.map((sip) => (
                <li key={sip.id} onClick={() => handleSelect(sip, setSelectedSIP2, setSearchTerm2, setResults2)}>
                  {sip.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {selectedSIP1 && selectedSIP2 && (
        <div className="sip-comparison">
          {[selectedSIP1, selectedSIP2].map((sip, index) => (
            <div className="sip-card" key={index}>
              <h3>{sip.name}</h3>
              <p><strong>Category:</strong> {sip.Category}</p>
              <p><strong>Manufacturer:</strong> {sip.manufacturer}</p>
              <p><strong>Version:</strong> {sip.Versions}</p>
              <p><strong>OS:</strong> {sip.operating_systems}</p>
              <p><strong>Price:</strong> ${sip.price}</p>
              <p><strong>Year:</strong> {sip.product_launch_year}</p>
              <p><strong>Firmware:</strong> {sip.firmware_stack}</p>
              <p><strong>Connectivity:</strong> {sip.connectivity_options}</p>
              <p><strong>Specs:</strong> {sip.hardware_specifications}</p>
              <p><strong>OTA:</strong> {sip.supports_ota ? 'Yes' : 'No'}</p>
              <p><strong>Software:</strong> {sip.software_components_used}</p>
              <p><strong>Power:</strong> {sip.power_specs}</p>
              <p><strong>Dependencies:</strong> {sip.linked_dependencies}</p>
              <p><strong>Certifications:</strong> {sip.certifications_met}</p>
              <p><strong>Markets:</strong> {sip.available_markets}</p>
              <p><a href={sip.official_site} target="_blank" rel="noreferrer">Official Site</a></p>
              <p><a href={sip.external_reviews} target="_blank" rel="noreferrer">Review</a></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comparison;
