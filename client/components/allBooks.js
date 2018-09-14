import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBooks, removeABook} from '../reducers/book'
import BooksQuery from './books-query'
import ConnectedAddBook from './add-book'

class AllBooks extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/addBook" />
    }
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
          {isAdmin ? (
            <div>
              {this.renderRedirect()}
              <button type="submit" onClick={this.setRedirect}>
                Add Book Item
              </button>
            </div>
          ) : (
            <div />
          )}
          {books && books.length ? (
            books.map(book => {
              return (
                <li className="column" key={book.id}>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>{' '}
                  <img src={book.imageUrl} />
                  {isAdmin ? (
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
            })
          ) : (
            <h1>No Matching Results</h1>
          )}
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
