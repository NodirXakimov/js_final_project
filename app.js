import products from "./products.json" assert { type: "json" };

const cart = [];

const products_container = document.querySelector(".products-container");
const cart_items_container = document.querySelector(".cart-up-side");
const total_price = document.querySelector(".total-price");

products.forEach((product) => {
  products_container.innerHTML += `
    <div class="product">
        <img src="./images/${product.image}" alt="">
        <div class="product-details">
            <div class="product-details-left-side">
                <p class="product-name">${product.name}</p>
                <p class="product-price">$${product.price}</p>
            </div>
            <div>
                <button data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    </div>
    `;
});

const addToCartButtons = document.querySelectorAll(".product-details button");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {

    if(!cart.includes(e.target.dataset.id)) {
        cart.push(e.target.dataset.id);
        renderCart();
    }else {
        alert("This item is selected");
    }
  });
});

function renderCart() {
  if (cart.length == 0) {
    cart_items_container.innerHTML = "<h2>Your cart is empty</h2>";
  } else {
      cart_items_container.innerHTML = ""
    cart.forEach((id) => {
      cart_items_container.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-left-side">
                    <img src="./images/${products[id-1].image}" alt="">
                </div>
                <div class="cart-item-right-side">
                    <p class="cart-item-name">${products[id-1].name}</p>
                    <p class="cart-item-price">$${products[id-1].price}</p>
                    <button data-id="${products[id-1].id}" class="removeItemButton">Remove item</button>
                </div>
            </div>
            `;
    });
  }
  showTotalPrice();
  document.querySelectorAll(".removeItemButton").forEach((button) => {
    button.addEventListener("click", function(e){
      removeItemFromCart(e.target.dataset.id)
    })
  })
}

function showTotalPrice() {
    let totalPrice = 0;
    if(cart.length > 0) {
      cart.forEach(item => {
        totalPrice += products[item-1].price;
      })
    }
    total_price.innerHTML = "Total: $" + totalPrice ;
}

function removeItemFromCart(id) {
  cart.forEach((item, index) => {
    if(item == id) {
      cart.splice(index, 1);
    }
  })
  renderCart()
}

showTotalPrice();
renderCart();