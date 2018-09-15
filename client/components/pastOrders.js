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
      <ul>
        {orders &&
          orders.filter(order => order.userId === userId).map(order => {
            return (
              <div className="column" key={order.id}>
                <li>
                  <Link to={`/Orders/${order.id}`}>
                    {order.date} {order.price}
                  </Link>{' '}
                </li>
              </div>
            )
          })}
      </ul>
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
