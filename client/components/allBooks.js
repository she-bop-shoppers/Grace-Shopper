import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBooks, removeABook} from '../reducers/book'

class AllBooks extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(id) {
    this.props.removeBook(id)
  }

  componentDidMount() {
    this.props.fetchBooks()
  }
  render() {
    const {books, isAdmin} = this.props
    return (
      <ul>
        {books &&
          books.map(book => {
            return (
              <li key={book.id}>
                {book.title}
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

const ConnectedBooksQuery = connect(mapStateToProps, mapDispatchToProps)(
  AllBooks
)

export default ConnectedBooksQuery
