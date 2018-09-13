import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBooks, removeABook} from '../reducers/book'
import BooksQuery from './books-query'

class AllBooks extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  handleDelete(id) {
    this.props.removeBook(id)
  }

  render() {
    const {books, isAdmin} = this.props

    return (
      <div>
        <BooksQuery />
        <h1>BOOKS</h1>
        <ul>
          {books &&
            books.map(book => {
              return (
                <li key={book.id}>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>{' '}
                  <img src={book.imageUrl} />
                  {!isAdmin ? (
                    <button
                      type="submit"
                      onClick={() => this.handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  ) : (
                    <div />
                  )}
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBooks: () => dispatch(getBooks()),
    removeBook: id => dispatch(removeABook(id))
  }
}

const mapStateToProps = state => {
  return {books: state.books.allBooks, isAdmin: state.user.isAdmin}
}

const ConnectedAllBooks = connect(mapStateToProps, mapDispatchToProps)(AllBooks)

export default ConnectedAllBooks
