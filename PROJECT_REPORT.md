# PhishGuard Lite – Project Report

## Abstract
PhishGuard Lite is a lightweight, beginner‑friendly web application that evaluates the safety of a URL using a set of simple, well‑documented heuristic rules. The system provides an explainable risk score (0‑100) and categorises the risk as **Low**, **Medium**, or **High**, together with detected indicators and security recommendations. No external APIs, databases, or machine‑learning models are used, making the tool easy to understand, demonstrate, and extend.

## Objectives
- Build a full‑stack JavaScript application (React + Vite front‑end, Node.js + Express back‑end).
- Implement a deterministic URL‑analysis engine based on common phishing characteristics.
- Deliver a clean, responsive UI suitable for a live demo.
- Produce comprehensive documentation (README, project report, requirements) for academic evaluation.

## Problem Statement
Phishing attacks often rely on deceptive URLs to trick users into revealing credentials. Existing detection solutions can be complex, require heavy dependencies, or involve opaque ML models. The goal is to create an educational tool that demonstrates core phishing‑detection concepts using transparent, reproducible heuristics.

## Methodology
1. **Frontend** – React components built with Vite for rapid development.
2. **Backend** – Express API exposing a single `/api/evaluate` endpoint.
3. **Heuristic Engine** – Implemented in `urlEvaluator.js`:
   - IP‑address hostnames
   - Unusually long URLs (> 75 chars)
   - Excessive subdomains (≥ 4 parts)
   - Presence of `@` before the true domain
   - Phishing‑related keywords in the path (`login`, `secure`, `update`, `verify`, `account`, `bank`, `confirm`)
4. **Scoring** – Each indicator adds a weighted amount to a cumulative score (capped at 100).
5. **Categorisation** –
   - 0‑39 → **Low**
   - 40‑69 → **Medium**
   - 70‑100 → **High**

## Architecture
```
+-------------------+       +--------------------+
|   React (Vite)    | <---> |  Express API (Node)|
|  UI/Logic Layer   |  HTTP |   /api/evaluate    |
+-------------------+       +--------------------+
        |                           |
        |   Heuristic Engine (JS)   |
        +---------------------------+
```

## Requirements
- **Node.js** ≥ 20
- **npm** ≥ 10

(See `requirements.txt`.)

## Implementation Details
- **Frontend** (`frontend/`):
  - `App.jsx` – handles user input, fetches results, displays score, indicators, and recommendations.
  - `ResultPanel.jsx` – a dedicated component for the result display.
  - `App.css` – simple, responsive styling with a cyber‑security colour palette.
  - Vite proxy forwards `/api/*` to `http://localhost:5000`.

- **Backend** (`backend/`):
  - `server.js` – Express server with CORS, body parsers, POST & GET endpoints.
  - `urlEvaluator.js` – pure‑function `evaluateUrl(url)` returning `{score, category, indicators, recommendations}`.
  - No external services; all computation is in‑process.

## Test Cases (Synthetic)
| Test URL | Expected Category | Detected Indicators |
|----------|-------------------|----------------------|
| `http://example.com/login` | Low | — |
| `http://192.168.1.100/secure/account` | Medium | Hostname is an IP address |
| `http://very-long-domain.example.com/path/…/75chars` | Medium | Unusually long URL |
| `http://login.secure.bank.example.com/verify` | High | Multiple subdomains, phishing‑keyword |
| `http://example.com/@malicious.com` | High | Suspicious “@” usage |
| `http://phish.com/update?account=123` | Medium | Phishing‑related keyword |

## Limitations
- Heuristics are intentionally simple; false positives/negatives may occur.
- The engine never fetches the target page, so it cannot detect content‑based threats.
- No persistence; each request is stateless.
- Not suitable for production security monitoring without further hardening.

## Conclusion
PhishGuard Lite meets the master‑class criteria by providing a working, easily demonstrable application that showcases core phishing‑detection concepts. The codebase is small, readable, and fully documented, allowing students to explain each component during a viva. Future work could extend the heuristic set, integrate a benign whitelist, or add unit tests.

---
*Prepared by the student for the Cybersecurity Masterclass Project Evaluation.*