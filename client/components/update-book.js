import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {editedBook} from '../reducers/book'
import BookForm from './book-form'

class UpdateBook extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      price: 0,
      description: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const response = await axios.get(
      `/api/books/${this.props.match.params.bookId}`
    )
    const book = response.data
    this.setState({
      title: book.title,
      price: book.price,
      description: book.description,
      quantity: book.quantity
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateBook(this.props.match.params.bookId, this.state)
    alert('Book successfully updated')
  }

  render() {
    console.log(this.state)
    return (
      <BookForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {updateBook: (bookId, book) => dispatch(editedBook(bookId, book))}
}

const ConnectedUpdateBook = connect(null, mapDispatchToProps)(UpdateBook)

export default ConnectedUpdateBook
