import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {getBooks, removeABook} from '../reducers/book'

class BookInventory extends Component {
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
    const {books} = this.props

    return (
      <div>
        <h1>BOOKS</h1>
        <div>
          {this.renderRedirect()}
          <button type="submit" onClick={this.setAddRedirect}>
            Add Book Item
          </button>
        </div>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
            <th>Update</th>
          </tr>
          {books &&
            books.map(book => {
              return (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author.fullName}</td>
                  <td>{book.price}</td>
                  <td>{book.quantity}</td>
                  <td>
                    {' '}
                    <button
                      type="submit"
                      onClick={() => this.handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {this.renderRedirect()}
                    <button
                      type="submit"
                      onClick={() => this.setUpdateRedirect(book.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
        </table>
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
  return {books: state.books.allBooks}
}

const ConnectedAllBooks = connect(mapStateToProps, mapDispatchToProps)(
  BookInventory
)

export default ConnectedAllBooks
