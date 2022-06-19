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
            <button class="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
      `
    );
  }, "");
};


run();