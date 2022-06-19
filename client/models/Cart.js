class Cart {
  constructor(cartItems = []) {
    this.cartItems = cartItems;
  }

  updateCartItem(cartItem, quantity = 1) {
    // check if cartItem already exists in cart
    const itemIndex = this.cartItems.findIndex((item) => {
      return item.product.id === cartItem.product.id;
    });
    if (itemIndex !== -1) {
      const item = this.cartItems[itemIndex];
      item.quantity += quantity; // increase quantity by 1

      if (item.quantity <= 0) {
        this.cartItems.splice(itemIndex, 1); // remove item if quantity is <= 0
      }
      return; // exit function
    }
    
    if (quantity > 0) this.cartItems.push({ ...cartItem, quantity });
  }
}
