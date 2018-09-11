import {combineReducers} from 'redux'
import books from './book'
import user from './user'

const reducer = combineReducers({user, books})

export default reducer
