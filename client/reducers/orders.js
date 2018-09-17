import axios from 'axios'
import history from '../history'
// import {CardActions} from '@material-ui/core'

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const GET_SINGLE_ORDER = 'GET_SINGLE_ORDER'
const POST_THE_ORDER = 'POST_THE_ORDER'
const POST_NEW_ITEM = 'POST_NEW_ITEM'
// const REMOVE_order = 'REMOVE_order';
// const ADD_order = 'ADD_order';

// INITIAL STATE
const initialState = {
  allOrders: [],
  selectedOrder: {},
  allItems: []
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
const addedNewOrder = order => ({
  type: POST_THE_ORDER,
  order
})

const addedNewItem = item => ({
  type: POST_NEW_ITEM,
  item
})

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

export const postNewOrder = order => {
  return async dispatch => {
    try {
      order.map(book => (book.bookId = book.id))
      const response = await axios.post('/api/orders', order)
      const postedorder = response.data
      dispatch(addedNewOrder(postedorder))
      order.forEach(async item => {
        item.bookId = item.id
        item.orderId = postedorder.id
        const orderBooksRes = await axios.post('/api/orderBooks', item)
        const posteditem = orderBooksRes.data
        dispatch(addedNewItem(posteditem))
      })
    } catch (err) {
      console.error(err)
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
    case POST_THE_ORDER:
      return {...state, allOrders: [...state.allOrders, action.order]}
    case POST_NEW_ITEM:
      return {...state, allItems: [...state.allItems, action.item]}
    default:
      return state
  }
}
export default orders
