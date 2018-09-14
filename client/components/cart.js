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
    this.props.gotAllBook()
  }
  handleDelete(evt, bookId) {
    console.log('this is delete', bookId)
    this.props.removeItem(bookId)
  }

  render() {
    const book = this.props.book

    console.log('the book from storage', book)
    console.log('the book from storage', book)
    const bookId = book.id
    console.log('this is id', bookId)
    return (
      book && (
        <div key={book.id}>
          <h1>{book.title}</h1>
          <img src={book.imageUrl} />
          <p>{book.description}</p>
          <p>Price: ${book.price}</p>
          <div>
            Quentity:
            <select>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(each => {
                return <option key={each}>{each}</option>
              })}
            </select>
          </div>
          <p>Subtotal: $</p>
          <button
            type="submit"
            onClick={() => this.handleDelete(this.props.book.id)}
          >
            Delete
          </button>
        </div>
      )
    )
  }
}

const mapDispatchToProps = dispatch => ({
  gotAllBook: () => dispatch(getBooksFromStorage()),
  removeItem: bookId => dispatch(removeFromCart(bookId))
})

const mapStateToProps = state => ({
  book: state.cart.book
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
