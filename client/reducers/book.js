import axios from 'axios'
import history from '../history'
import {CardActions} from '@material-ui/core'

/**
 * ACTION TYPES
 */
const UPDATE_BOOK = 'UPDATE_BOOK'
const GET_BOOKS_BY_QUERY = 'GET_BOOKS_BY_QUERY'
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'

/**
 * INITIAL STATE
 */
const initState = {
  allBooks: [],
  singleBook: {},
  booksMatchingQuery: []
}

/**
 * ACTION CREATORS
 */

const getBooksByQuery = books => ({type: GET_BOOKS_BY_QUERY, books})
const getSingleBook = id => ({type: GET_BOOK, payload: id})
const removeBook = () => ({type: REMOVE_BOOK})
const updateBook = book => ({type: UPDATE_BOOK, book})

/**
 * THUNK CREATORS
 */

export const editedBook = (bookId, reqBody) => {
  return async dispatch => {
    try {
      const response = await axios.put('/api/books/' + bookId, reqBody)
      dispatch(updateBook(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getQueriedBooks = queryDetails => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/books?${queryDetails.queryType}=${queryDetails.queryValue}`
    )
    dispatch(getBooksByQuery(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchSingleBook = id => {
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
    case UPDATE_BOOK:
      return {
        ...state,
        singleBook: action.book,
        allBooks: [
          ...state.allBooks.map(
            book => (action.book.id === book.id ? action.book : book)
          )
        ]
      }
    case GET_BOOKS_BY_QUERY:
      return {...state, booksMatchingQuery: action.books}
    default:
      return state
  }
}
