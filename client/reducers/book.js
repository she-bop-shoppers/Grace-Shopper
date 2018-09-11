import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_BOOK = 'GET_BOOK'
const REMOVE_BOOK = 'REMOVE_BOOK'
const UPDATE_BOOK = 'UPDATE_BOOK '

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
const updateBook = book => ({type: UPDATE_BOOK, book})

/**
 * THUNK CREATORS
 */
export const editedBook = (bookId, reqBody) => {
  return async dispatch => {
    const response = await axios.put('/api/books/' + bookId, reqBody)
    dispatch(updateBook(response.data))
  }
}

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_BOOK:
      return action.book
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

    default:
      return state
  }
}
