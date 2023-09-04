import chai from 'chai'
import mongoose from 'mongoose'
import User from '../src/dao/Mongo/models/User.js'

const expect = chai.expect

mongoose.connect('mongodb+srv://kikidemar:hola1234@kikidb.t2krew0.mongodb.net/commerce')

describe('Testing User Mongo', ()=>{
  before(function(){
    this.userDao = new User()
  })
  beforeEach(function(){
    this.timeout(2000)
  })

  it('Nuestro dao debe obtener todos los usuarios en formato array', async function(){
    const result = await this.usersDao.get()
    expect(result).to.be.deep.equal([])
  })
})