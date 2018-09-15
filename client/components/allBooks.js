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
      addRedirect: false,
      updateRedirect: false,
      bookId: ''
    }
  }

  componentDidMount() {
    this.props.fetchBooks()
  }

  setAddRedirect = () => {
    this.setState({
      addRedirect: true
    })
  }

  setUpdateRedirect = bookId => {
    this.setState({
      bookId,
      updateRedirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.addRedirect) {
      return <Redirect to="/addBook" />
    }
    if (this.state.updateRedirect) {
      return <Redirect to={`/updateBook/${this.state.bookId}`} />
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
              <button type="submit" onClick={this.setAddRedirect}>
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
                    <div>
                      {' '}
                      <button
                        type="submit"
                        onClick={() => this.handleDelete(book.id)}
                      >
                        Delete
                      </button>
                      <div>
                        {this.renderRedirect()}
                        <button
                          type="submit"
                          onClick={() => this.setUpdateRedirect(book.id)}
                        >
                          Update Item
                        </button>
                      </div>
                    </div>
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
