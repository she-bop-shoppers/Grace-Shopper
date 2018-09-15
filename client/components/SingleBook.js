import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {addNewBookToCart} from '../reducers/cart'
import Review from '../components/Review'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    const bookId = Number(this.props.match.params.bookId)
    this.props.singleBook(bookId)
  }
  handleAddToCart() {
    const {book} = this.props
    this.props.addBook(book)
  }
  render() {
    const {book} = this.props
    const {author} = book
    console.log('Book', this.props.book.reviews)
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
        <button type="submit" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
        <br />
        <br />
        <Review book={book} />
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
