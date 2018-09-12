import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const UPDATE_BOOK = 'UPDATE_BOOK'
const GET_BOOKS = 'GET_BOOKS'
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

const getRequestedBooks = books => ({type: GET_BOOKS, books})
const getSingleBook = book => ({type: GET_SINGLE_BOOK, singleBook: book})
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

export const getBooks = queryDetails => async dispatch => {
  try {
    console.log('MADE IT HERE')
    if (queryDetails) {
      const {data} = await axios.get(
        `/api/books?${queryDetails.type}=${queryDetails.value}`
      )
      dispatch(getRequestedBooks(data))
    } else {
      console.log('MAKE IT INSIDE')
      const {data} = await axios.get(`/api/books`)
      console.log('DATA', data)
      dispatch(getRequestedBooks(data))
    }
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
        ...state,
        singleBook: action.singleBook
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
    case GET_BOOKS:
      return {...state, allBooks: action.books}
    default:
      return state
  }
}
