import {combineReducers} from 'redux'
import books from './book'
import user from './user'
import authors from './author'
import genres from './genres'
import cart from './Cart'
import reviews from './review'
import orders from './orders'

const reducer = combineReducers({
  user,
  books,
  authors,
  genres,
  cart,
  reviews,
  orders
})

export default reducer
