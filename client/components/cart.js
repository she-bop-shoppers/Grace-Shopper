import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {removeFromCart, getBooksFromStorage} from '../reducers/cart'

class Cart extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    this.props.gotAllBooks()
  }
  handleDelete(bookId) {
    this.props.removeItem(bookId)
  }

  render() {
    const books = this.props.books
    if (books.length > 0) {
      return (
        <div>
          {books.map(book => {
            return (
              <div key={book.id}>
                <h1>{book.title}</h1>
                <img src={book.imageUrl} />
                <p>{book.description}</p>
                <p>Price: ${book.price}</p>
                <p>Quantity: {book.quantity}</p>
                <p>Subtotal: $</p>
                <button
                  type="submit"
                  onClick={() => this.handleDelete(book.id)}
                >
                  Delete
                </button>
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
  removeItem: bookId => dispatch(removeFromCart(bookId))
})

const mapStateToProps = state => ({
  books: state.cart.books
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
