function sendLocation() {
  // Проверяем, поддерживается ли геолокация
  if (!navigator.geolocation) {
    alert("Ваш браузер не поддерживает геолокацию.");
    return;
  }

  // Получаем координаты
  navigator.geolocation.getCurrentPosition(function(position) {
    // Формируем данные для отправки
    const data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };

    // Отправляем POST-запрос на сервер
    fetch('https://dima-github-com1.onrender.com/send-location', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => {
      if(response.ok) {
        alert("Геолокация отправлена!");
      } else {
        alert("Ошибка отправки геолокации.");
      }
    })
    .catch(err => {
      alert("Ошибка соединения с сервером.");
    });
  }, function(error) {
    alert("Не удалось получить геолокацию: " + error.message);
  });
}
