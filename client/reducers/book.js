import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOK = 'GET_BOOK'
const GET_BOOKS_BY_QUERY = 'GET_BOOKS_BY_QUERY'
const REMOVE_BOOK = 'REMOVE_BOOK'

/**
 * INITIAL STATE
 */
const initState = {
  allBooks: [],
  singleBook: {},
  booksMatchingQuery: [],
}

/**
 * ACTION CREATORS
 */
const getBook = book => ({type: GET_BOOK, book})
const getBooksByQuery = books => ({type: GET_BOOKS_BY_QUERY, books})
const removeBook = () => ({type: REMOVE_BOOK})

/**
 * THUNK CREATORS
 */
 export const getQueriedBooks = queryDetails => async dispatch => {
   try {
     const {data} = await axios.get(`/api/books?${queryDetails.queryType}=${queryDetails.queryValue}`)
     dispatch(getBooksByQuery(data))
   } catch (err) {
     console.error(err)
   }
 }

/**
 * REDUCER
 */
export default function (state = initState, action) {
  switch (action.type) {
    case GET_BOOK:
      return action.book
    case REMOVE_BOOK:
      return action.book
    case GET_BOOKS_BY_QUERY:
      return { ...state, booksMatchingQuery: action.books }
    default:
      return state
  }
}
