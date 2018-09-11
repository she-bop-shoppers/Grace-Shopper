import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOK = 'GET_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'

/**
 * INITIAL STATE
 */
const initState = {
  allBooks: [],
  singleBook: {}
}

/**
 * ACTION CREATORS
 */
const getBook = user => ({type: GET_BOOK, user})
const removeBook = () => ({type: REMOVE_BOOK})

/**
 * THUNK CREATORS
 */


/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_BOOK:
      return action.book
    case REMOVE_BOOK:
      return action.book
    default:
      return state
  }
}
