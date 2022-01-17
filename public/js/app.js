const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const image = document.querySelector('#image');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = 'loading...';
  const location = search.value;
  if (!location) return console.log('Please input search term');
  fetch(`http://localhost:8000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = `Weather: ${data.response.weather_descriptions[0]} - Degrees: ${data.response.temperature}`;
          image.src = data.response.weather_icons[0];
          console.log(data);
        }
      });
    }
  );
});
