import mongoose from 'mongoose'
import User from '../src/dao/Mongo/models/User.js'
import Assert from 'assert'

connect('mongodb+srv://kikidemar:hola1234@kikidb.t2krew0.mongodb.net/commerce')

const assert = Assert.strict

describe('Testing User Mongo', ()=>{
  before(function(){
    this.userDao = new User()
  })
  beforeEach(function(){
    this.timeout(2000)
  })
  it('Nuestro dao debe leer todos los usuarios en formato array', async function(){
    const result = await this.userDao.get()
    assert.strictEqual(Array.isArray(result), true)
  })

  it('El dao de Users debe agregar un usuario correctamente a la base de datos', async function(){
    let mockUser = {
      first_name: 'Christiann',
      email: 'demarchi.christiann@gmail.com',
      password: 'hola1234'
    }
    const result = await this.userDao.save(mockUser)
    assert.ok(result._id)
  })

})