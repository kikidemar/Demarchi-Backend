

class ProductManager {
  constructor() {
    this.products = []
  }

  getProducts() {
    console.log(this.products)
    return this.products
  }

  addProduct({ title, description, price, thumbnail, stock, code }) {

    let id = 1

    if (this.products.length === 0) {
      id=1
    } else {
      let lastProduct = this.products[this.products.length - 1]
      id = lastProduct.id + 1
    }

    let product = { title, description, price, thumbnail, stock, code, id }

    // for ( product in this.products) {
    //   if (product.code === code){
    //     console.error('Ya existe un producto con el mismo codigo')
    //   } else {
    //     this.products.push(product)
    //   }
    // }

    this.products.push(product)

  }

  getProductById(product_id) {
    
    const product = this.products.find(p => p.id === parseInt(product_id))

    if (product) {
      console.log(product)
      return product
    } else {
      console.error('Not found')
      return null
    }
  }

}

let product = new ProductManager()

product.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc123', stock: 25})
product.getProducts()
product.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc123', stock: 25})
product.getProductById(1)
product.getProductById(3)
