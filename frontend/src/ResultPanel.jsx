import React from 'react';

function ResultPanel({ result }) {
  const { score, category, indicators, recommendations } = result;

  const borderColor = {
    High: '#e74c3c',
    Medium: '#f1c40f',
    Low: '#2ecc71',
  }[category] || '#bdc3c7';

  return (
    <div className="result-panel" style={{ borderColor }}>
      <h2>Analysis Result</h2>
      <p>
        <strong>Risk Score:</strong> {score} (<span className="category">{category}</span>)
      </p>
      <section>
        <h3>Detected Indicators</h3>
        {indicators.length > 0 ? (
          <ul>
            {indicators.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        ) : (
          <p>None detected.</p>
        )}
      </section>
      <section>
        <h3>Recommendations</h3>
        <ul>
          {recommendations.map((r, idx) => (
            <li key={idx}>{r}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ResultPanel;
