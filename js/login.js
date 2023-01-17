const elForm = document.querySelector('.js-form');
const elInputPassword = document.querySelector('.js-input-password');
const elInputEmail = document.querySelector('.js-input-email');

const localData = localStorage.getItem('token');
if (localData) {
  location.replace("index.html")
}

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  fetch('http://192.168.100.247:5000/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: elInputEmail.value,
      password: elInputPassword.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.replace('index.html');
      }
    })
    .catch((err) => console.log(err));
  console.log();
});
