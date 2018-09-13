import {combineReducers} from 'redux'
import books from './book'
import user from './user'
import authors from './author'
import genres from './genres'

const reducer = combineReducers({user, books, authors, genres})


export default reducer
