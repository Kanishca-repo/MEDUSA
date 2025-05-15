const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnClose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromLocalStorage(); // Load stored cart data
  loadperf();
});

function loadperf() {
  loadcontent();
}

function loadcontent() {
  let btnRemove = document.querySelectorAll(".cart-remove");
  btnRemove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  let cartBtns = document.querySelectorAll(".add-cart");
  cartBtns.forEach((btn) => {
    btn.addEventListener("click", addCart);
  });
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(itemList));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem("cartItems");
  if (savedCart) {
    itemList = JSON.parse(savedCart);

    // Populate the cart with stored items
    itemList.forEach((item) => {
      let newProductElement = createCartProduct(item.title, item.imgSrc);
      let element = document.createElement("div");
      element.innerHTML = newProductElement;
      let cartBasket = document.querySelector(".cart-content");
      cartBasket.append(element);
    });

    loadcontent(); // Reattach event listeners for newly loaded items
  }
}

// Remove Item
function removeItem() {
  if (confirm("Are You Sure To Remove")) {
    let title = this.parentElement.querySelector(".cart-perf-title").innerHTML;
    itemList = itemList.filter((el) => el.title != title);
    this.parentElement.remove();
    loadcontent();

    // Save updated cart to localStorage
    saveCartToLocalStorage();
  }
}

let itemList = [];

// Add Item to Cart
function addCart() {
  let food = this.parentElement;
  let title = food.querySelector(".food-title").innerHTML;
  let imgSrc = food.querySelector(".perf-img").src;

  let newProduct = { title, imgSrc };

  if (itemList.find((el) => el.title == newProduct.title)) {
    alert("Product Already added in Cart");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, imgSrc);
  let element = document.createElement("div");
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(element);
  loadcontent();

  // Save the updated cart to localStorage
  saveCartToLocalStorage();
}

// Create HTML for Cart Product
function createCartProduct(title, imgSrc) {
  return `
                <div class="cart-box">
                    <img src="${imgSrc}" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-perf-title">${title}</div>
                    </div>
                    <i class="fa-solid fa-trash cart-remove" style="color: #eedbbf;"></i>
                </div>
            `;
}
