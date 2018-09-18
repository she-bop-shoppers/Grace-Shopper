/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../../../server/db')
const app = require('../../../server/index.js')
const Genre = db.model('genre')
const Book = db.model('book')

describe('Genre routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/genres/', () => {
    const name = 'Fantasy'

    beforeEach(() => {
      return Genre.create({name})
    })

    it('GET /api/genres', async () => {
      const res = await request(app)
        .get('/api/genres')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(name)
    })

    it('GET /api/genres/:id', async () => {
      const genre = await Genre.findOne({
        where: {name: 'Fantasy'}
      })
      //console.log('in the GET /api/genres/:id spec, genre is', genre.id, 'typeof genreid', typeof genre.id)
      const res = await request(app)
        .get(`/api/books/${genre.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body[0].name).to.be.equal(name)
    })
  }) // end describe('/api/books')
}) // end describe('Book routes')
