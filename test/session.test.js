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

  it('Get para Users', async ()=>{
    
  })
  it('Login', async ()=>{
    
  })
  it('Register', async ()=>{
    
})
})

export default 0