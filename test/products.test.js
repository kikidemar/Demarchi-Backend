import mongoose, { connect } from "mongoose"

import dotenv from "dotenv"

import { describe } from "mocha"
import Assert from "assert"
import { expect } from "chai"
import supertest from "supertest"

import products from "../src/dao/Mongo/productDao.mongo.js"
import users from "../src/controllers/auth.controller.js"

dotenv.config()

const assert = Assert.strict
const requester = supertest("http://localhost:8080")

connect(process.env.LINK_MONGO)

describe('Test del CRUD para Products', ()=>{
  let pid
  it('Get para Products', async ()=>{
    const result = await requester.get('/api/products')
    console.log(result.body.payload)

    expect(result.status).to.equal(200)
    expect(result.body).to.have.property('payload')
    expect(result.body.payload).to.have.an('array')
  })
  it('Get by ID de Products', async ()=>{
    pid='6481590dbe5f2323f0cbb9d0'
    const result= await requester.get(`/api/products/${pid}`)
    console.log(result)

    expect(result.status).to.equal(200)
    expect(result.body).to.have.property('payload')
    expect(result.body.payload).to.have.property('_id', pid)
  })
  it('Delete by ID de Products', async ()=>{})
})