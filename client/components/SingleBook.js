import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {addNewBookToCart} from '../reducers/cart'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {
      updateRedirect: false
    }
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    const bookId = Number(this.props.match.params.bookId)
    this.props.singleBook(bookId)
  }
  handleAddToCart() {
    const {book} = this.props
    this.props.addBook(book)
  }
  setUpdateRedirect = () => {
    this.setState({
      updateRedirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.updateRedirect) {
      return <Redirect to={`/updateBook/${this.props.match.params.bookId}`} />
    }
  }

  handleDelete(id) {
    this.props.removeBook(id)
  }

  render() {
    const {book, isAdmin} = this.props
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
        {isAdmin ? (
          <div>
            {' '}
            <button type="submit" onClick={() => this.handleDelete(book.id)}>
              Delete
            </button>
            <div>
              {this.renderRedirect()}
              <button type="submit" onClick={() => this.setUpdateRedirect()}>
                Update Item
              </button>
            </div>
          </div>
        ) : (
          <div />
        )}
        <button type="submit" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.books.singleBook,
    isAdmin: state.user.isAdmin
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
