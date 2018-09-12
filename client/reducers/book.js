import axios from 'axios'
import history from '../history'
import {CardActions} from '@material-ui/core'

/**
 * ACTION TYPES
 */
const UPDATE_BOOK = 'UPDATE_BOOK'
const GET_BOOKS = 'GET_BOOKS'
const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'
const ADD_BOOK = 'ADD_BOOK'
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
const getSingleBook = id => ({type: GET_BOOK, payload: id})
const removeBook = bookId => ({type: REMOVE_BOOK, bookId})
const addBook = book => ({type: ADD_BOOK, book})
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

export const addNewBook = book => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/books/', book)
      dispatch(addBook(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeABook = bookId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/books/${bookId}`)
      dispatch(removeBook(bookId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getBooks = queryDetails => async dispatch => {
  try {
    if (queryDetails) {
      const {data} = await axios.get(
        `/api/books?${queryDetails.type}=${queryDetails.value}`
      )
      dispatch(getRequestedBooks(data))
    } else {
      const {data} = await axios.get(`/api/books`)
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
        singleBook: action.payload
      }
    case REMOVE_BOOK:
      return {
        ...state,
        allBooks: state.allBooks.filter(book => action.bookId !== book.id)
      }
    case ADD_BOOK:
      return {
        ...state,
        allBooks: [...state.allBooks, action.book]
      }
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
