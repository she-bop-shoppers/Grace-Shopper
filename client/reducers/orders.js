import axios from 'axios'
import history from '../history'
// import {CardActions} from '@material-ui/core'

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
// const REMOVE_order = 'REMOVE_order';
// const ADD_order = 'ADD_order';

// INITIAL STATE
const initialState = {
  allOrders: [],
  selectedOrder: {}
}

//ACTION CREATORS
const gotOrders = allOrders => ({type: GET_ORDERS, allOrders})
const getOneOrder = order => ({
  type: GET_SINGLE_ORDER,
  selectedOrder: order
})

// const removedorder = (id) => ({ type: REMOVE_order, id });

// const addedorder = (order) => ({
// 	type: ADD_order,
// 	selectedorder: order
// });

// THUNK CREATORS
export const getAllOrders = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders')
      console.log(response.data)
      dispatch(gotOrders(response.data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getSingleOrder = id => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/orders/' + id)
      const order = response.data
      dispatch(getOneOrder(order))
    } catch (error) {
      console.log(error)
    }
  }
}

/**
 * REDUCER
 */
const orders = function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, allOrders: action.allOrders}
    case GET_SINGLE_ORDER:
      return {...state, selectedOrder: action.selectedOrder}
    default:
      return state
  }
}
export default orders
