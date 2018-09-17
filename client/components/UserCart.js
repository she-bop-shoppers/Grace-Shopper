import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  removeFromCart,
  getBooksFromStorage,
  updateCartItem,
  removeAllItemsInCart
} from '../reducers/cart'
import {postNewOrder} from '../reducers/orders'

class UserCart extends Component {
  constructor() {
    super()
    this.state = {quantity: 0}
    this.handleDelete = this.handleDelete.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.gotAllBooks()
  }
  handleDelete(bookId) {
    this.props.removeItem(bookId)
  }

  changeQuantity(event) {
    const newQuantity = Number(event.target.value)
    this.setState({quantity: newQuantity})
  }

  handleUpdate(book) {
    this.props.updateItem(this.state.quantity, book)
    this.setState({quantity: 0})
  }

  handleCheckout(newOrder) {
    console.log('inside handlePost', newOrder)
    this.props.addOrder(newOrder)
    this.props.emptyCart()
  }

  render() {
    const books = this.props.books
    if (books.length > 0) {
      return (
        <div>
          <button type="submit" onClick={() => this.handleCheckout(books)}>
            Checkout
          </button>
          {books.map(book => {
            return (
              <div key={book.id}>
                <h1>{book.title}</h1>
                <img src={book.imageUrl} />
                <p>{book.description}</p>
                <p>Price: ${book.price}</p>
                <p>Quantity: {book.quantity}</p>
                <p>Subtotal: ${book.quantity * book.price}</p>
                <div>
                  Change Quantity:{' '}
                  <input
                    onChange={this.changeQuantity}
                    name="quantity"
                    value={this.state.quantity}
                    type="tel"
                  />{' '}
                  <button type="submit" onClick={() => this.handleUpdate(book)}>
                    Update quantity
                  </button>{' '}
                  <br />
                  <br />
                  <button
                    type="submit"
                    onClick={() => this.handleDelete(book.id)}
                  >
                    Delete Item
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )
    } else return <div>You do not have any books in your cart ;)</div>
  }
}

const mapDispatchToProps = dispatch => ({
  gotAllBooks: () => dispatch(getBooksFromStorage()),
  removeItem: bookId => dispatch(removeFromCart(bookId)),
  updateItem: (quantity, book) => dispatch(updateCartItem(quantity, book)),
  addOrder: newOrder => dispatch(postNewOrder(newOrder)),
  emptyCart: () => dispatch(removeAllItemsInCart())
})

const mapStateToProps = state => ({
  books: state.cart.books
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCart)
)
