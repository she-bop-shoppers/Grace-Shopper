import {combineReducers} from 'redux'
import books from './book'
import user from './user'
import authors from './author'

const reducer = combineReducers({user, books, authors})

export default reducer
