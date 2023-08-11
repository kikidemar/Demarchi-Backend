import { Router } from "express";
import { faker } from "@faker-js/faker";

const mocking_router = Router()

const generateProducts = ()=>{
  return {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      stock: faker.random.numeric(1),
      description: faker.commerce.productDescription(),
      id: faker.database.mongodbObjectId(),
      image: faker.image.image(),
      code: faker.datatype.string(10)
  }
}

mocking_router.get('/', (req, res) => {
  let products = []
  for (let i = 0; i < 100; i++) {
    products.push(generateProducts())
  }
  res.send({
    status: 'success',
    payload: products
  })
})

export default mocking_router