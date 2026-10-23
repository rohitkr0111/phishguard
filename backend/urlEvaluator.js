/**
 * Simple heuristic URL evaluation for PhishGuard Lite.
 * Returns an object:
 * {
 *   score: 0-100,
 *   category: 'Low'|'Medium'|'High',
 *   indicators: [string],
 *   recommendations: [string]
 * }
 */
function evaluateUrl(inputUrl) {
  const indicators = [];
  const recommendations = [];
  let score = 0;

  // Basic validation – must be a parsable URL
  let urlObj;
  try {
    // If missing protocol, prepend http:// for parsing
    const prefixed = /^https?:\/\//i.test(inputUrl) ? inputUrl : `http://${inputUrl}`;
    urlObj = new URL(prefixed);
  } catch (e) {
    return {
      score: 100,
      category: 'High',
      indicators: ['Invalid URL format'],
      recommendations: ['Ensure the URL is correctly typed and includes a domain.']
    };
  }

  const hostname = urlObj.hostname;
  const pathname = urlObj.pathname;
  const fullUrl = urlObj.href;

  // 1. IP address as hostname
  const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  if (ipRegex.test(hostname)) {
    indicators.push('Hostname is an IP address');
    score += 20;
  }

  // 2. Very long URL ( > 75 characters )
  if (fullUrl.length > 75) {
    indicators.push('Unusually long URL');
    score += 15;
  }

  // 3. Multiple subdomains (e.g., login.secure.example.com)
  const subdomains = hostname.split('.');
  if (subdomains.length > 3) {
    indicators.push('Multiple subdomains (possible phishing trick)');
    score += 15;
  }

  // 4. Presence of '@' symbol before the actual domain
  if (fullUrl.includes('@')) {
    indicators.push('Suspicious "@" usage in URL');
    score += 25;
  }

  // 5. Suspicious patterns – common phishing keywords
  const phishingKeywords = ['login', 'secure', 'update', 'verify', 'account', 'bank', 'confirm'];
  const lowerPath = pathname.toLowerCase();
  if (phishingKeywords.some(k => lowerPath.includes(k))) {
    indicators.push('Phishing‑related keyword in path');
    score += 10;
  }

  // Cap score at 100
  if (score > 100) score = 100;

  // Category mapping
  let category = 'Low';
  if (score >= 70) category = 'High';
  else if (score >= 40) category = 'Medium';

  // Recommendations based on detected flags
  if (indicators.length === 0) {
    recommendations.push('URL appears benign based on simple heuristics. Still verify the site before entering credentials.');
  } else {
    recommendations.push('Do not click the link. Verify the domain manually or use a trusted security tool.');
  }

  return {
    score,
    category,
    indicators,
    recommendations
  };
}

module.exports = { evaluateUrl };
