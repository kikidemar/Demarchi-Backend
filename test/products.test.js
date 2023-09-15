import mongoose, { connect } from "mongoose"

import dotenv from "dotenv"

import { describe } from "mocha"
import Assert from "assert"
import { expect } from "chai"
import supertest from "supertest"

dotenv.config()

const assert = Assert.strict
const requester = supertest("http://localhost:8080")

connect(process.env.LINK_MONGO)

describe('Test del CRUD para Products', ()=>{
  let pid
  it('Get para Products', async ()=>{
    const result = await requester.get('/api/products')

    const responseBody = JSON.parse(result.text)
    // console.log(responseBody)

    expect(responseBody.status).to.equal(200)
    expect(responseBody.products).to.have.an('array')
  })
  it('Get by ID de Products', async ()=>{
    pid='6481590dbe5f2323f0cbb9d0'
    const result= await requester.get(`/api/products/${pid}`)
    const responseBody = JSON.parse(result.text)
    // console.log(responseBody)

    expect(responseBody.status).to.equal(200)
    expect(responseBody.product).to.have.property('_id')
  })
  it('Update by ID de Products', async ()=>{
    pid='64bffb7495ec838a1c76ab85'
    const updatedData= { price: 50 }
    const result= await requester.put(`/api/products/${pid}`).send(updatedData)
    const responseBody = JSON.parse(result.text)
    console.log(responseBody)

    expect(responseBody.status).to.equal(200)
    expect(responseBody.message).to.equal('product updated')
  })
})

export default 0