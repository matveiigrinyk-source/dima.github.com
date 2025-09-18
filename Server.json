const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Ваши данные для Telegram-бота
const TELEGRAM_TOKEN = "7405407984:AAGwudecZWnjOnDAhMpD6mXx-c3Et8TNAVk";
const CHAT_ID = "247873071";

// Эндпоинт для проверки работы сервера
app.get('/', (req, res) => {
  res.send('Сервер для геолокации работает!');
});

// Эндпоинт для отправки геолокации
app.post('/send-location', async (req, res) => {
  try {
    const { latitude, longitude, accuracy } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).send('Нет координат');
    }
    const text = 
      `Координаты:\n` +
      `Широта: ${latitude}\n` +
      `Долгота: ${longitude}\n` +
      `Точность: ±${accuracy || 'не указана'} м\n` +
      `Карта: https://maps.google.com/?q=${latitude},${longitude}`;

    // Отправка сообщения в Telegram
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    res.send({ ok: true });
  } catch (err) {
    res.status(500).send('Ошибка сервера: ' + err.message);
  }
});

// Для Render обязательно использовать PORT из env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
