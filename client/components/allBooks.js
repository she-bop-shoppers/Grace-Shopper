import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBooks} from '../reducers/book'

class AllBooks extends Component {
  componentDidMount() {
    this.props.fetchBooks()
  }

  render() {
    const books = this.props.books
    console.log('BOOKS ARE', books)
    return (
      <div>
        <h1>BOOKS</h1>
        <ul>
          {books &&
            books.map(book => {
              return (
                <li key={book.id}>
                  <Link to={`/books/${book.id}`}>{book.title}</Link>{' '}
                  <img src={book.imageUrl} />
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {fetchBooks: () => dispatch(getBooks())}
}

const mapStateToProps = state => {
  console.log(state)
  return {books: state.books.allBooks}
}

const ConnectedAllBooks = connect(mapStateToProps, mapDispatchToProps)(AllBooks)

export default ConnectedAllBooks
