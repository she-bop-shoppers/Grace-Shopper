import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 //  */

const GET_BOOKS = 'GET_BOOKS'
const ADD_BOOK = 'ADD_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'
const UPDATE_CART = 'UPDATE_CART'
const EMPTY_CART = 'EMPTY_CART'

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
const updateCart = book => ({type: UPDATE_CART, book})
const deleteAllItems = itemsIds => ({
  type: EMPTY_CART,
  itemsIds
})

/**
 * THUNK CREATORS
 */

export const addNewBookToCart = book => {
  return dispatch => {
    try {
      const prevValue = JSON.parse(localStorage.getItem(book.id))
      if (prevValue) {
        book.quantity = book.quantity + prevValue.quantity
      }
      book.subTotal = book.price * book.quantity
      localStorage.setItem(JSON.stringify(book.id), JSON.stringify(book))
      dispatch(addedBookToCart(book))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateCartItem = (quantity, book) => {
  return dispatch => {
    try {
      book.quantity = quantity
      book.subTotal = book.price * book.quantity
      localStorage.setItem(JSON.stringify(book.id), JSON.stringify(book))
      dispatch(updateCart(book))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = bookId => {
  return async dispatch => {
    try {
      await localStorage.removeItem(JSON.stringify(bookId))
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

export const removeAllItemsInCart = () => {
  return async dispatch => {
    try {
      const allBookIds = Object.keys(localStorage)
      
      await allBookIds.forEach(id => {
        return localStorage.removeItem(id)
      })
      dispatch(deleteAllItems())
    } catch (err) {
      console.error(err)
    }
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
        books: [
          ...state.books.filter(x => x.id !== action.book.id),
          action.book
        ]
      }
    case UPDATE_CART:
      return {
        ...state,
        books: [
          ...state.books.map(
            book => (action.book.id === book.id ? action.book : book)
          )
        ]
      }
    case GET_BOOKS:
      return {
        ...state,
        books: action.books
      }
    case EMPTY_CART:
      return {
        ...state,
        books: []
      }
    default:
      return state
  }
}
