import axios from 'axios'
import history from '../history'

const initState = {
  allGenres: [],
  singleGenre: {}
}

//Actions
const GET_GENRES = 'GET_GENRES'
const GET_SINGLE_GENRE = 'GET_SINGLE_GENRE'

//Action Creators

const getAllGenres = genres => ({type: GET_GENRES, genres})
const getOneGenre = oneGenre => ({
  type: GET_SINGLE_GENRE,
  singleGenre: oneGenre
})

//Thunk Creators

export const getGenres = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/genres')
      const action = getAllGenres(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSingleGenre = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/genres/' + id)
      const action = getOneGenre(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer

export default function(state = initState, action) {
  switch (action.type) {
    case GET_GENRES:
      return {
        ...state,
        allGenres: action.genres
      }
    case GET_SINGLE_GENRE:
      return {
        ...state,
        singleGenre: action.singleGenre
      }
    default:
      return state
  }
}
