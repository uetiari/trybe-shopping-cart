function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function getProductsApi(product) {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
  await response.json()
    .then((data) => data.results
    .forEach((obj) => {
      const product = {
        sku: obj.id,
        name: obj.title,
        image: obj.thumbnail,
      };
      const ol = document.querySelector('.items');
      ol.appendChild(createProductItemElement(product));
    }));
  // const ol = document.querySelector('.items');
  // ol.appendChild(createProductItemElement(product));
}
// consultei o github da Beatriz Ribeiro porque meus produtos não estavam aparecendo, mas olhando o que ela fez, percebi que minhas linhas 41 e 42 estavam fora do escopo e por isso estava undefined.
// https://github.com/tryber/sd-014-b-project-shopping-cart/pull/52/

function cartItemClickListener(event) {
  // coloque seu código aqui
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

window.onload = () => {
  getProductsApi('computador');
};
