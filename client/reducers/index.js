import {combineReducers} from 'redux'
import books from './book'
import user from './user'
import genres from './genres'

const reducer = combineReducers({user, books, genres})

export default reducer
