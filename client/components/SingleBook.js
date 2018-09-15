import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {addNewBookToCart} from '../reducers/cart'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {quantity: 0}

    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.addQuantity = this.addQuantity.bind(this)
  }

  componentDidMount() {
    const bookId = Number(this.props.match.params.bookId)
    this.props.singleBook(bookId)
  }

  addQuantity(event) {
    this.setState({quantity: event.target.value})
  }

  handleAddToCart() {
    const {book} = this.props
    book.quantity = Number(this.state.quantity)
    this.props.addBook(book)
    alert(
      `you have "${book.quantity}" books with the title "${
        book.title
      }" in your cart`
    )
    this.setState({quantity: 0})
  }
  render() {
    const {book} = this.props
    const {author} = book
    console.log('Book', this.props.book.author)
    return (
      <div>
        <h1>{book.title}</h1>
        <img src={book.imageUrl} />
        <p>{book.description}</p>
        <p>Price: ${book.price}</p>
        <p>
          Author:{' '}
          {author && author.fullName
          // <Link to={`/authors/${author.id}`}>{author.fullName}</Link>
          }
        </p>
        <div>
          Quantity:{' '}
          <input
            onChange={this.addQuantity}
            name="quantity"
            value={this.state.quantity}
            type="tel"
          />
        </div>{' '}
        <button type="submit" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.books.singleBook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singleBook: bookId => dispatch(fetchSingleBook(bookId)),
    addBook: book => dispatch(addNewBookToCart(book))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleBook)
)
