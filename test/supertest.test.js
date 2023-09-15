import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest.requester('http://localhost:8080')

describe('App Testing', ()=>{
  describe('Test de products', ()=>{
    it('El endpoint Post /api/products debe crear un producto correctamente', async ()=>{
      const productMock = {
        title: 'coca cola',
        describe:'Gaseosa',
        price:'200'
      }
      const resp = await requester.post('/api/products').send(productMock)
      console.log(resp)
    })
  })
})