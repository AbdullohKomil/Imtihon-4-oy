const elForm = document.querySelector('.js-form');
const elInputPassword = document.querySelector('.js-input-password');
const elInputEmail = document.querySelector('.js-input-email');
const elInputName = document.querySelector('.js-input-name');
const elInputPhone = document.querySelector('.js-input-phone');


elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  fetch('http://192.168.100.247:5000/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_name: elInputName.value,
      phone: elInputPhone.value,
      email: elInputEmail.value,
      password: elInputPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.replace('index.html');
      }
    })
    .catch((err) => console.log(err));
});
