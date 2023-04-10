

class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    console.log(this.products)
    return this.products
  }

  addProduct({ title, description, price, thumbnail, stock }) {

    let id = 1

    if (this.products.length === 0) {
      id=1
    } else {
      let lastProduct = this.products[this.products.length - 1]
      id = lastProduct.id + 1
    }



    let product = { title, description, price, thumbnail, stock, id }

    this.products.push(product)
  }

  getProductById(id) {
    
    const product = this.products.find(p => p.id === parseInt(id))

    if (product) {
      console.log(product)
      return product
    } else {
      console.error('Not found')
    }
  }

}

let product = new ProductManager()


