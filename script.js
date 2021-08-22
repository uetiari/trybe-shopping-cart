const itemsCart = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img'); // cria uma img
  img.className = 'item__image'; // dá uma classe a imagem
  img.src = imageSource; // atribui ao param a imagem com classe
  return img; // retorna a imagem completa
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element); // cria um elemento
  e.className = className; // atribui classe ao elemento
  e.innerText = innerText; // colocar o texto ao elemento
  return e; // retorna o elemento com as propriedades criadas.
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section'); // cria um elemento section
  section.className = 'item'; // adiciona uma classe item
  
  section.appendChild(createCustomElement('span', 'item__sku', sku)); // 
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!')); // dá os appends nas coisas todas pra virar um produto por completo 
  return section; // retorna tudo formatado
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText; // retorna o id do produto e insere no html
}

function loading() {
  const section = document.createElement('section');
  section.className = 'loading';
  section.innerText = 'Loading...';
  const items = document.querySelector('.items');
  items.appendChild(section);
}

function deleteLoad() {
  const del = document.querySelector('.loading');
  del.remove();
}
function savedLocalStorage() { // função que salva no Local Storage
  localStorage.setItem('Saved', itemsCart.innerHTML); // salva com chave Saved e valor os itens do carrinho
}
function loadLocalStorage() { // função que carrega no localStorage
  itemsCart.innerHTML = localStorage.getItem('Saved'); // carrega através da chave Saved
}

function cartItemClickListener(event) {
  event.target.remove(); // remove o item do carrinho de compras ao clicar nele
  savedLocalStorage();
}

itemsCart.addEventListener('click', cartItemClickListener); // aciona a função pra funcionar o LocalStorage tb!

function createCartItemElement({ id: sku, title: name, price: salePrice }) { // 
  const li = document.createElement('li'); // cria item da lista
  li.className = 'cart__item'; // adiciona classe nele
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`; // formata o jeito que tem que ser o item da lista
  return li; // retorna o item da lista
}

async function carProducts(sku) { // mesma lógica da função getProductsApi
  const respCart = await fetch(`https://api.mercadolibre.com/items/${sku}`);
  await respCart.json()
  .then((data) => {  
    const datas = { 
      id: data.id,
      title: data.title,
      price: data.price,
    };
    itemsCart.appendChild(createCartItemElement(datas));
  });
  savedLocalStorage(); 
}
// Repo Icaro https://github.com/tryber/sd-014-b-project-shopping-cart/pull/36/
  document.addEventListener('click', (event) => {
  if (event.target.className === 'item__add') {
    carProducts(getSkuFromProductItem(event.target.parentElement));
    }
    // console.log(event.target.parentElement);
});

async function getProductsApi() {
  loading(); // chama a função loading enquanto não vem resultado da API
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador'); // pega api
  await response.json() // tranforma os dados em json
    .then((data) => data.results.forEach((obj) => { // com json acima criar um produto para cada obj 
      const product = { // usa esse formato pro novo objeto
        sku: obj.id,
        name: obj.title,
        image: obj.thumbnail,
      };
      const ol = document.querySelector('.items'); // pega a div com classe items
      ol.appendChild(createProductItemElement(product)); // adiciona o resultado acima na div formando uma lista
    }))
    .then(() => { deleteLoad(); });
  // const ol = document.querySelector('.items');
  // ol.appendChild(createProductItemElement(product));
}
// Repo Beatriz Ribeiro https://github.com/tryber/sd-014-b-project-shopping-cart/pull/52/

function clearCart() {
  itemsCart.innerHTML = ''; // atribui string vazia para deixar sem itens
  savedLocalStorage();
}
const clearBtn = document.querySelector('.empty-cart'); // pega botão do HTML
clearBtn.addEventListener('click', clearCart); // quando clicado aciona função acima.

window.onload = () => {
  getProductsApi();
  // clearCart(); // chamando antes o localStorage não funciona
  loadLocalStorage();
};
