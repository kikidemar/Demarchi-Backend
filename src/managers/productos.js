import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path
    this.init(path)
  }

  init(path) {
    let file = fs.existsSync(path)
    
    if (!file) {
      fs.writeFileSync(path, '[]' )
      console.log('file created at path: ' + this.path)
      return 201
    } else {
      this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'))
      console.log('data recovered')
      return 200
    }

  }

  getProducts() {
    try {
      if (this.products.length === 0) {
        console.log('Not found')
        return "Not found"
      } else {
        return this.products
      }
    } catch (error) {
      console.error(error)
      return "getProducts: error"
    }
  }

  async addProduct({ title, description, price, thumbnail, stock, code}) {
    try {
      let product = { title, description, price, thumbnail, stock, code}
  
      if (this.products.length > 0) {
        let nextId = this.products[this.products.length - 1].id + 1
        product.id = nextId
      } else {
        product.id = 1
      }
  
      if (this.products.some(product => product.code === code)) {
        console.error('Ya existe un producto con el mismo código')
        return 400
      } else {
        this.products.push(product)
  
        let productJSON = JSON.stringify(this.products, null, 2)
  
        await fs.promises.writeFile(this.path, productJSON)
        console.log('Product created: ' + product.id)
        return 201
      }
    } catch (error) {
      console.log(error)
      return 'addProduct: error'
    }
  }
  

  getProductById(productId) {
    try{
    const product = this.products.find(p => p.id === parseInt(productId))

    if (product) {
      console.log(product)
      return product
    } else {
      console.error('Not found')
      return null
    } 
  } catch (error) {
    console.log(error)
    return 'getProductById: error'
  }
  }

  async updateProduct(id, data) {
    try {
      let one = this.getProductById(id)
      for (let prop in data) {
        one[prop] = data[prop]
      }

      const index = this.products.findIndex(p => p.id === one.id)
      this.products[index] = one

      let productJSON = JSON.stringify(this.products, null, 2 )
      await fs.promises.writeFile(this.path, productJSON)
      console.log('UpdateProduct: done')
      return 200
    } catch(error) {
      console.log(error)
      return null
    }
  }

  async deleteProduct (id) {
    try {
      this.products = this.products.filter(each => each.id!== id)

      let productJSON = JSON.stringify(this.products, null, 2)

      await fs.promises.writeFile(this.path, productJSON)
      console.log('delete product: done')
      return 200
    } catch(err) {
      console.log(err)
      return null
    }
  }

}

  let manager = new ProductManager('./src/data/products.json')

  export default manager



// async function product() {


//   await product.addProduct({ title: 'coca', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc123', stock: 25})
//   await product.addProduct({ title: 'sprite', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc124', stock: 25})
//   await product.addProduct({ title: 'fanta', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc125', stock: 25})
//   await product.addProduct({ title: 'pomelo', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc126', stock: 25})
//   await product.addProduct({ title: 'agua', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc127', stock: 25})
//   await product.addProduct({ title: 'fernet', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc128', stock: 25})
//   await product.addProduct({ title: 'gancia', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc129', stock: 25})
//   await product.addProduct({ title: 'redbull', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc130', stock: 25})
//   await product.addProduct({ title: 'speed', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc131', stock: 25})
//   await product.addProduct({ title: 'aquarius', description: 'Este es un producto prueba', price: 200, thumbnail:'Sin imagen', code: 'abc132', stock: 25})
//   await product.getProductById(9)
//   await product.updateProduct(9, {title: 'monster'})
//   await product.deleteProduct(10)
//   await product.getProducts();

// }

// product()

