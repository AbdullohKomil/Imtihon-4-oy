const elList = document.querySelector('.js-list');
const localData = localStorage.getItem('token');

fetch('http://192.168.100.247:5000/product', {
  headers: {
    authorization: localData,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.forEach((element) => {
      elList.innerHTML += `
          <li class="list-unstyled col-3 ms-3 card p-0 ">
            <img src="http://192.168.100.247:5000/${element.product_img}" id="images_backend" class="w-100 h-75" alt="...">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${element.product_name}</li>
              <li class="list-group-item">${element.product_price}</li>
              <li class="list-group-item">${element.product_desc}</li>
            </ul>
          </li>
          `;
    });
  })
  .catch((err) => console.log(err));