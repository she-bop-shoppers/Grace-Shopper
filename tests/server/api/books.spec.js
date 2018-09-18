/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index.js')
const Book = db.model('book')

describe('Book routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/books/', () => {
    const title = 'Code Name Verity'
    const price = 13

    beforeEach(() => {
      return Book.create({
        title,
        price
      })
    })

    it('GET /api/books', async () => {
      const res = await request(app)
        .get('/api/books')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal(title)
      expect(res.body[0].price).to.be.equal(price)
    })

    it('POST /api/books', async () => {
      const newBook = {title: 'Twelve Kings of Sharakai', price: 14}
      const res = await request(app)
        .post('/api/books', newBook)
        .expect(201)

      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal(newBook.title)
      expect(res.body.price).to.be.equal(newBook.price)
    })
  }) // end describe('/api/books')
}) // end describe('Book routes')
