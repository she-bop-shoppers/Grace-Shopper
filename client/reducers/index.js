import {combineReducers} from 'redux'
import books from './book'
import user from './user'
import authors from './author'
import genres from './genres'
import cart from './Cart'

const reducer = combineReducers({user, books, authors, genres, cart})

export default reducer
