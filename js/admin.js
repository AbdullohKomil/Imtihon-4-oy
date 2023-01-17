const elList = document.querySelector('.js-list');
const elForm = document.querySelector('.js-form');
const elInputImg = document.querySelector('.js-image');
const elInputName = document.querySelector('.js-name');
const elInputDesc = document.querySelector('.js-desc');
const elInputPrice = document.querySelector('.js-price');

const localData = localStorage.getItem('token');

let renderProduct = (arr, node) => {
  node.innerHTML = '';
  arr.forEach((element) => {
    node.innerHTML += `
     <li class="list-unstyled col-3 mt-4 ms-3 card p-0 d-flex">
          <img src="http://192.168.100.247:5000/${element.product_img}" id="images_backend" class="w-100 h-75" alt="...">
          <ul class="list-group list-group-flush">
          <li class="list-group-item">${element.product_name}</li>
          <li class="list-group-item">${element.product_price}</li>
          <li class="list-group-item">${element.product_desc}</li>
          </ul>
          <div class="btns d-flex justify-content-center" >
          <button data-product-id=${element.id} class="btn btn-warning product-edit w-25 ms-2" >EDIT</button>
          <button data-product-id=${element.id} class="btn btn-danger product-delete w-25 ms-2" >DELETE</button
          </div>
     </li>
          `;
  });
};

const productsFunc = () => {
  fetch('http://192.168.100.247:5000/product', {
    headers: {
      authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        renderProduct(data, elList);
      }
    });
};

productsFunc()

const fetchFunc = () => {
  const data = new FormData();
  data.append('product_name', elInputName.value);
  data.append('product_desc', elInputDesc.value);
  data.append('product_img', elInputImg.files[0]);
  data.append('product_price', elInputPrice.value);
  console.log(data);
  fetch('http://192.168.100.247:5000/product', {
    method: 'POST',
    headers: {
      authorization: localData,
    },
    body: data,
  })
    .then((res) => res.json())
    .then((data) => productsFunc())
    .catch((err) => console.log(err));
};

elForm.addEventListener('submit', (evt) => {
  evt.preventDefault;
  fetchFunc();
});

const deleteProduct = (id) => {
  fetch(`http://192.168.100.247:5000/product/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        productsFunc();
      }
    })
    .catch((err) => console.log(err));
};

let btnClose = document.querySelector('.js-close-btn');
let elModal = document.querySelector('.js-modal');
const elEditImg = document.querySelector('.js-edit-image');
const elEditName = document.querySelector('.js-edit-name');
const elEditDesc = document.querySelector('.js-edit-desc');
const elEditPrice = document.querySelector('.js-edit-price');
const elFormModal = document.querySelector('.js-form-modal');

const editProduct = (id) => {
  const Newdata = new FormData();
  Newdata.set('product_name', elEditName.value);
  Newdata.set('product_desc', elEditDesc.value);
  Newdata.set('product_img', elEditImg.files[0]);
  Newdata.set('product_price', elEditPrice.value);
  fetch(`http://192.168.100.247:5000/product/${id}`, {
    method: 'PUT',
    headers: {
      authorization: localData,
    },
    body: Newdata,
  })
    .then((res) => res.json())
    .then((data) => productsFunc())
    .catch((err) => console.log(err));
};

elList.addEventListener('click', (evt) => {
  if (evt.target.matches('.product-delete')) {
    const productId = evt.target.dataset.productId;
    deleteProduct(productId);
  }
  if (evt.target.matches('.product-edit')) {
    elModal.classList.remove('close');
    const productId = evt.target.dataset.productId;
    elFormModal.addEventListener('submit', (event) => {
      event.preventDefault();
      elModal.classList.add('close');
      editProduct(productId);
    });
  }
});

btnClose.addEventListener('click', () => {
  elModal.classList.add('close');
});
