const products_container = document.getElementById("products");
const product_details_container = document.getElementById("productDetails");

function createProductCard(product) {
  const img = document.createElement("img");
  img.setAttribute("src", product.image);

  const title_product = document.createElement("h4");
  title_product.innerText = product.title;

  const category = document.createElement("span");
  category.innerText = product.category;
  const price = document.createElement("p");
  price.innerHTML = `Price: <span>$${product.price}</span>`;
  const addToCart = document.createElement("button");
  addToCart.innerText = "Add to Cart";

  const product_card = document.createElement("div");
  product_card.classList.add("product");

  product_card.append(img, title_product, category, price, addToCart);

  product_card.addEventListener("click", function () {
    showProductDetails(product_card);
  });

  return product_card;
}
function showProductDetails(product) {
  product_details_container.innerHTML = "";

  const img = document.createElement("img");
  img.setAttribute("src", product.image);

  const title_product = document.createElement("h2");
  title_product.innerText = product.title;

  const category = document.createElement("span");
  category.innerText = product.category;

  const price = document.createElement("p");
  price.innerHTML = `Price: <span>$${product.price}</span>`;

  product_details_container.append(img, title_product, category, price);
}

const base_url = "https://fakestoreapi.com/products";

async function getAllProducts() {
  try {
    let result = await fetch(base_url);
    let products = await result.json();
    return products;
  } catch (error) {
    console.log(error);
  }
}

async function mountProducts() {
  try {
    let products = await getAllProducts();
    if (products && products.length > 0) {
      let product_cards = products.map((product) => createProductCard(product));
      products_container.append(...product_cards);
    } else {
      const errorElement = document.createElement("h4");
      errorElement.innerText = "Something went wrong with the products";
      errorElement.style.color = "red";
      products_container.appendChild(errorElement);
    }
  } catch (error) {
    console.log(error);
  }
}

mountProducts();
