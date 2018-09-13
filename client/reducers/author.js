import axios from 'axios'
import history from '../history'
// import {CardActions} from '@material-ui/core'

// ACTION TYPES
const GET_AUTHORS = 'GET_AUTHORS'
// const REMOVE_AUTHOR = 'REMOVE_AUTHOR';
// const ADD_AUTHOR = 'ADD_AUTHOR';

// INITIAL STATE
const initialState = {
  allAuthors: [],
  selectedAuthor: {}
}

//ACTION CREATORS
const gotAuthors = allAuthors => ({type: GET_AUTHORS, allAuthors})

// const removedAuthor = (id) => ({ type: REMOVE_AUTHOR, id });

// const addedAuthor = (author) => ({
// 	type: ADD_AUTHOR,
// 	selectedAuthor: author
// });

// THUNK CREATORS
export const getAllAuthors = () => {
  return async dispatch => {
    console.log('ENTERING GET AUTHOR FUNC')
    try {
      const response = await axios.get('/api/authors')
      console.log(response.data)
      dispatch(gotAuthors(response.data))
    } catch (err) {
      console.error(err)
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
    default:
      return state
  }
}
export default authors
