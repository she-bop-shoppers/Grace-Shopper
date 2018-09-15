import axios from 'axios'
import history from '../history'

const initState = {
  reviews: [],
  review: {}
}

//ACTIONS
const GET_REVIEWS = 'GET_REVIEWS'
const GET_ONE_REVIEW = 'GET_ONE_REVIEW'

//ACTION CREATORS
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const getOneReview = review => ({type: GET_ONE_REVIEW, review: review})

//THUNK CREATOR
export const fetchReviews = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/reviews/')
      const action = getReviews(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const singleBookReviews = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/reviews' + id)
      const action = getOneReview(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {...state, reviews: action.reviews}
    default:
      return state
  }
}
