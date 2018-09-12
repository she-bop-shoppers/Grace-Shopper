import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBooks} from '../reducers/book'

class AllBooks extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.props.fetchBooks()
  }
  render() {
    const books = this.props.books
    return (
      <ul>
        {books.map(book => {
          return <li key={book.id}>{book.title}</li>
        })}
      </ul>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {fetchBooks: () => dispatch(getBooks())}
}

const mapStateToProps = state => {
  return {books: state.books}
}

const ConnectedBooksQuery = connect(mapStateToProps, mapDispatchToProps)(
  AllBooks
)

export default ConnectedBooksQuery
