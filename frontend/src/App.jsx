import React, { useState } from 'react';
import ResultPanel from './ResultPanel.jsx';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    setError(null);
    setResult(null);
    if (!url.trim()) {
      setError('Please enter a URL.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.error || 'Server error');
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (e) {
      setError('Network error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const riskColor = (category) => {
    switch (category) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      default: return 'green';
    }
  };

  return (
    <div className="container">
      <h1>PhishGuard Lite</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter URL to scan"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleScan} disabled={loading}>
          {loading ? 'Scanning...' : 'Scan'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {result && <ResultPanel result={result} />}
    </div>
  );
}

export default App;
