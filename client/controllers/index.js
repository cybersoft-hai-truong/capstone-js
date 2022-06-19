const cart = new Cart();

const query = (selector) => document.querySelector(selector);

const run = () => {
  ProductService.getAllProducts()
    .then((products) => {
      render(products);
    })
    .catch(console.log);
};

const render = (products) => {
  const items = query(".items");

  items.innerHTML = products.reduce((content, product) => {
    return (
      content +
      `
      <div class="col">
        <div class="card mx-auto border-0" style="width: 18rem">
          <img src="${product.img}" class="card-img-top" alt="" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">
              ${product.price}
            </p>
            <button class="btn btn-primary" onclick="updateCartItemQuantity(${product.id})">Add to cart</button>
          </div>
        </div>
      </div>
      `
    );
  }, "");
};

const updateCartItemQuantity = (productId, quantity = 1) => {
  ProductService.getProduct(productId)
    .then((product) => {
      const cartItem = new CartItem(product);
      cart.updateCartItem(cartItem, quantity);
      renderCart();
    })
    .catch(console.log);
};

const renderCart = () => {
  const cartNumber = query(".cart-number");
  const cartModalBody = query("#cartModal .modal-body");

  cartNumber.textContent = cart.cartItems.reduce(
    (number, cartItem) => number + cartItem.quantity,
    0
  ); // update cart item number

  cartModalBody.innerHTML = cart.cartItems.reduce((content, cartItem) => {
    return (
      content +
      `
    <div class="row cart-item">
      <div class="col-3">
        <img
          class="img-full"
          src="${cartItem.product.img}"
          alt=""
        />
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-8">
            <h3 class="cart-item-header">${cartItem.product.name}</h3>
            <p class="cart-item-price">Price: ${cartItem.product.price}</p>
          </div>
          <div class="col-4 text-center">
            <button class="btn btn-outline-danger" onClick="updateCartItemQuantity(${cartItem.product.id}, -1)">-</button>
            <span class="d-block d-sm-inline">${cartItem.quantity}</span>
            <button class="btn btn-outline-primary" onClick="updateCartItemQuantity(${cartItem.product.id})">+</button>
          </div>
        </div>
      </div>
    </div>`
    );
  }, "");
};

run();
