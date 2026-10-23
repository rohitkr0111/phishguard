const express = require('express');
const cors = require('cors');
const { evaluateUrl } = require('./urlEvaluator');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text({ type: '*/*' }));
app.use(express.urlencoded({ extended: true }));

app.post('/api/evaluate', (req, res) => {
  const { url } = req.body;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid URL payload.' });
  }
  try {
    const result = evaluateUrl(url);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error while evaluating URL.' });
  }
});

app.get('/api/evaluate', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }
  try {
    const result = evaluateUrl(url);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Server error while evaluating URL.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`PhishGuard Lite backend listening on port ${PORT}`);
});
