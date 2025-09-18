function sendLocation() {
  if (!navigator.geolocation) {
    alert("Ваш браузер не поддерживает геолокацию.");
    return;
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    const data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };

    fetch('/send-location', {
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
