import axios from 'axios'
import history from '../history'
// import {CardActions} from '@material-ui/core'

// ACTION TYPES
const GET_AUTHORS = 'GET_AUTHORS'
const REMOVE_AUTHOR = 'REMOVE_AUTHOR'
const ADD_AUTHOR = 'ADD_AUTHOR'
const UPDATE_AUTHOR = 'UPDATE_AUTHOR'

// INITIAL STATE
const initState = {
  allAuthors: [],
  selectedAuthor: {}
}

/**
 * ACTION CREATORS
 */

const gotAuthors = authors => ({type: GET_AUTHORS, allAuthors: authors})

const removedAuthor = id => ({type: REMOVE_AUTHOR, id})

const updatedAuthor = author => ({type: UPDATE_AUTHOR, author})

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
    if (queryDetails.type) {
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
