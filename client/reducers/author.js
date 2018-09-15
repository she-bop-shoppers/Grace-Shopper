import axios from 'axios'
import history from '../history'
// import {CardActions} from '@material-ui/core'

// ACTION TYPES
const GET_AUTHORS = 'GET_AUTHORS'
const GET_SINGLE_AUTHOR = 'GET_SINGLE_AUTHOR'
// const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
// const ADD_AUTHOR = 'ADD_AUTHOR';

// INITIAL STATE
const initialState = {
  allAuthors: [],
  selectedAuthor: {}
}

//ACTION CREATORS
const gotAuthors = allAuthors => ({type: GET_AUTHORS, allAuthors})
const getOneAuthor = author => ({
  type: GET_SINGLE_AUTHOR,
  selectedAuthor: author
})

// const removedAuthor = (id) => ({ type: REMOVE_AUTHOR, id });

// const addedAuthor = (author) => ({
// 	type: ADD_AUTHOR,
// 	selectedAuthor: author
// });

// THUNK CREATORS
export const getAllAuthors = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/authors')
      console.log(response.data)
      dispatch(gotAuthors(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getSingleAuthor = id => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/authors/' + id)
      const author = response.data
      dispatch(getOneAuthor(author))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
const authors = function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return {...state, allAuthors: action.allAuthors}
    case GET_SINGLE_AUTHOR:
      return {...state, selectedAuthor: action.selectedAuthor}
    default:
      return state
  }
}
export default authors
