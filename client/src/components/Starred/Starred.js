import { useEffect, useState } from 'react';
import '../../styles/Starred.css';

const Starred = () => {
  const [starred, setStarred] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('starredSIPs')) || [];
    setStarred(stored);
  }, []);

  const handleUnstar = (id) => {
    const updated = starred.filter(item => item.Id !== id);
    localStorage.setItem('starredSIPs', JSON.stringify(updated));
    setStarred(updated);
  };

  return (
    <div className="starred-container">
      <h2>⭐ Starred SIPs</h2>

      {starred.length === 0 ? (
        <p className="empty-message">You haven’t starred anything yet.</p>
      ) : (
        <div className="starred-grid">
          {starred.map((sip) => (
            <div className="starred-card" key={sip.Id}>
              <div className="card-header">
                <h3>{sip.name}</h3>
                <button onClick={() => handleUnstar(sip.Id)}>🗑</button>
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
};

export default Starred;
