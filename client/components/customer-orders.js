import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {getAllOrders} from '../reducers/orders'

class CustomerOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const {orders} = this.props
    console.log('ORDERS', orders)
    return (
      <div>
        <h1>Customer Orders</h1>
        <table>
          <tr>
            <th>Order #</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Total $</th>
          </tr>
          <tbody>
            {orders &&
              orders.map(order => {
                return (
                  <tr key={order.id}>
                    {/* <Link to={`/Orders/${order.id}`}> */}
                    <td>{order.id}</td>
                    <td>{order.userId ? order.userId : 'Guest Customer'}</td>
                    <td>{order.date}</td>
                    <td>{order.totalPrice}</td>
                    {/* </Link>{' '} */}
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.allOrders
})

const mapDispatchToProps = dispatch => {
  return {fetchOrders: () => dispatch(getAllOrders())}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerOrders)
)
