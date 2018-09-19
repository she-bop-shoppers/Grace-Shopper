import axios from 'axios'
import history from '../history'

const initState = {
  reviews: [],
  review: {}
}

//ACTIONS
const GET_REVIEWS = 'GET_REVIEWS'
const GET_ONE_REVIEW = 'GET_ONE_REVIEW'
const ADD_ONE_REVIEW = 'ADD_ONE_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

//ACTION CREATORS
const getReviews = reviews => ({type: GET_REVIEWS, reviews})
const getOneReview = review => ({type: GET_ONE_REVIEW, review: review})
const addOneReview = newReview => ({type: ADD_ONE_REVIEW, payload: newReview})
const deleteOneReview = reviewId => ({
  type: DELETE_REVIEW,
  payload: reviewId
})

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

export const postOneReview = newReview => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/reviews/', newReview)
      const action = addOneReview(data)
      dispatch(action)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteReview = reviewId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`)
      dispatch(deleteOneReview(reviewId))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_REVIEWS:
      return {...state, reviews: action.reviews}
    case ADD_ONE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      }
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => action.payload !== review.id)
      }
    default:
      return state
  }
}
