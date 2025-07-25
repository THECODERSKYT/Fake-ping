import express from 'express';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Target to ping
const TARGET_URL = "https://codesandbox.io/p/devbox/pufferpanel-v5-forked-jwmsv7";

// Pinger logic (every 1 second)
setInterval(async () => {
  try {
    const res = await fetch(TARGET_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'RenderPingerBot/1.0'
      }
    });
    console.log(`[${new Date().toISOString()}] Pinged ${TARGET_URL} - ${res.status}`);
  } catch (error) {
    console.error("Ping failed:", error.message);
  }
}, 1000);

// Start server
app.listen(port, () => {
  console.log(`Pinger running on http://localhost:${port}`);
});
