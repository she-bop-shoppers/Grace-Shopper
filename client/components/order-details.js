import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class SingleOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      order: {}
    }
  }

  async componentDidMount() {
    const id = Number(this.props.match.params.id)
    const res = await axios.get(`/api/orders`)
    const allOrders = res.data
    console.log('ALL', allOrders)
    const order = allOrders.filter(order => order.id === id)
    console.log('ORDERS', order)
    this.setState({
      order: order
    })
  }

  render() {
    return (
      <div>
        <h1>Order Details</h1>
        <ul>
          {this.state.order[0] ? (
            this.state.order[0].books.map(book => (
              <li key={book.id}>
                <Link to={`/books/${book.id}`}>
                  {book.title} ({book.orderBook.quantity})
                </Link>
              </li>
            ))
          ) : (
            <div>
              <h1>Loading . . .</h1>
            </div>
          )}
        </ul>
      </div>
    )
  }
}

export default SingleOrder
