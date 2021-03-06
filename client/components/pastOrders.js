import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getAllOrders} from '../reducers/orders'

class PastOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const {orders, userId} = this.props
    console.log('ORDERS', orders)
    return (
      <div>
        {orders &&
          orders.filter(order => order.userId === userId).map(order => {
            return (
              <div className="column" key={order.id}>
                <ul>
                  {' '}
                  <h2> Order #{order.id}</h2>
                  <li> Date: {order.date}</li>{' '}
                  <li> Total: ${order.totalPrice}</li>
                  <Link to={`/orders/${order.id}`}>Order Details</Link>{' '}
                </ul>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.allOrders,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => {
  return {fetchOrders: () => dispatch(getAllOrders())}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PastOrders)
)
