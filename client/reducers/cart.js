import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 //  */

const GET_BOOKS = 'GET_BOOKS'
// const GET_SINGLE_BOOK = 'GET_SINGLE_BOOK'
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

const getBook = book => ({type: GET_BOOKS, book})
const deleteFromCart = bookId => ({type: REMOVE_BOOK, bookId})
const addedBookToCart = book => ({type: ADD_BOOK, book})

// const getSingleBook = (book) => ({ type: GET_SINGLE_BOOK, singleBook: book });

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
      dispatch(deleteFromCart())
    } catch (err) {
      console.error(err)
    }
  }
}

export const getBooksFromStorage = () => async dispatch => {
  try {
    const bookInStorage = await localStorage.getItem(JSON.stringify(4))
    dispatch(getBook(JSON.parse(bookInStorage)))
  } catch (err) {
    console.error(err)
  }
}

// export const fetchSingleBook = (id) => {
// 	return async (dispatch) => {
// 		try {
// 			const { data } = await axios.get('/api/books/' + id);
// 			const action = getSingleBook(data);
// 			dispatch(action);
// 		} catch (error) {
// 			console.log(error);
// 		}
// 	};
// };

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    // case GET_SINGLE_BOOK:
    // 	return {
    // 		...state,
    // 		singleBook: action.singleBook
    // 	};
    case REMOVE_BOOK:
      return {
        ...state
        // books: state.books.filter((book) => action.bookId !== book.id)
      }
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, action.book]
      }
    case GET_BOOKS:
      return {
        ...state,
        books: state.books.concat(action.book),
        book: action.book
      }
    default:
      return state
  }
}
