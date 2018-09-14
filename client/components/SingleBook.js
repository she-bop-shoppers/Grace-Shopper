import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {addNewBookToCart} from '../reducers/cart'

import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.addQuantity = this.addQuantity.bind(this)
  }

  componentDidMount() {
    const bookId = Number(this.props.match.params.bookId)
    this.props.singleBook(bookId)
  }

  addQuantity(event) {
    console.log('event', event.target.value)
    this.setState({quantity: event.target.value})
  }

  handleAddToCart() {
    const {book} = this.props
    book.quantity = Number(this.state.quantity)
    console.log('this is addQu', book.quantity)
    this.props.addBook(book)
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
          Quantity:
          <select onChange={this.addQuantity} value={this.state.quantity}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(each => {
              return (
                <option key={each} value={each + ''}>
                  {each}
                </option>
              )
            })}
          </select>
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
