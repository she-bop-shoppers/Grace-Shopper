import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 //  */

const GET_BOOKS = 'GET_BOOKS'
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'

/**
 * INITIAL STATE
 */
const initState = {
  books: [],
  book: {}
}

/**
 * ACTION CREATORS
 */

const getBooks = books => ({type: GET_BOOKS, books})
const deleteFromCart = bookId => ({type: REMOVE_BOOK, bookId})
const addedBookToCart = book => ({type: ADD_BOOK, book})

/**
 * THUNK CREATORS
 */

export const addNewBookToCart = book => {
  return dispatch => {
    try {
      localStorage.setItem(JSON.stringify(book.id), JSON.stringify(book))
      dispatch(addedBookToCart(book))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = bookId => {
  return async dispatch => {
    try {
      await localStorage.removeItem(JSON.stringify(bookId))
      //JSON.stringify
      dispatch(deleteFromCart(bookId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getBooksFromStorage = () => dispatch => {
  try {
    const allBookIds = Object.keys(localStorage)
    const allBooks = allBookIds.map(id => {
      return JSON.parse(localStorage.getItem(id))
    })
    dispatch(getBooks(allBooks))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case REMOVE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => action.bookId !== book.id)
      }
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.book]
      }
    case GET_BOOKS:
      return {
        ...state,
        books: action.books
      }
    default:
      return state
  }
}
