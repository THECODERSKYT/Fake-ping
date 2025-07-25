const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const TARGET_URL = "https://codesandbox.io/p/devbox/pufferpanel-v5-forked-jwmsv7";

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 1-second ping loop
setInterval(async () => {
  try {
    const res = await fetch(TARGET_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'RenderPingerBot/1.0'
      }
    });
    console.log(`[${new Date().toISOString()}] Pinged: ${res.status}`);
  } catch (err) {
    console.error("Ping failed:", err.message);
  }
}, 1000);

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
