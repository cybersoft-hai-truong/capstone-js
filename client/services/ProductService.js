class ProductService {
  static baseURL = "https://62add233b735b6d16a3a75d4.mockapi.io/CapstoneES6";

  static getAllProducts() {
    return fetch(this.baseURL)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
