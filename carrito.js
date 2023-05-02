import fs from 'fs';
import manager from 'productos.js'

class CartManager {
  constructor(path){
    this.carts = []
    this.path = path
    this.init(path)
  }


init(path) {
  let file = fs.existsSync(path)
  
  if (!file) {
    fs.writeFileSync(path, '[]' )
    console.log('file created at path: ' + this.path)
    return 'file created at path: ' + this.path
  } else {
    this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'))
    console.log('data recovered')
    return 'data recovered'
  }

}


async addCart( {productId, quantity} ) {
  try {
    let product = await manager.getProductById(productId)

    let data = {product, quantity}

    if (this.carts.length > 0) {
      let nextId = this.carts[this.carts.length - 1].id + 1
      data.id = nextId
    } else {
      data.id = 1
    }
    
      this.carts.push(data)

      let cartJSON = JSON.stringify(this.carts, null, 2)

      await fs.promises.writeFile(this.path, cartJSON)
      console.log('Cart created: ' + data.id)
      return 'Cart created: ' + data
    
  } catch (error) {
    console.log(error)
    return 'addCart: error'
  }
}

  getCarts() {
    try {
      if (this.carts.length === 0) {
        console.log('Not found')
        return "Not found"
      } else {
        return this.carts
      }
    } catch (error) {
      console.error(error)
      return "getCarts: error"
    }
  }

  getCartById(pid) {
    try{
    const cart = this.carts.find(c => c.id === parseInt(pid))

    if (cart) {
      console.log(cart)
      return cart
    } else {
      console.error('Not found')
      return null
    } 
  } catch (error) {
    console.log(error)
    return 'getCartById: error'
  }
  }

}

