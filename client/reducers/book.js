import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'
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
const getSingleBook = id => ({type: GET_BOOK, payload: id})
const removeBook = () => ({type: REMOVE_BOOK})

/**
 * THUNK CREATORS
 */

export const fetchSingleMessage = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/books/' + id)
      const action = getSingleBook(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_SINGLE_BOOK:
      return {
        singleBook: action.payload
      }
    case REMOVE_BOOK:
      return action.book
    default:
      return state
  }
}
