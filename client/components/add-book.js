import React from 'react'
import {connect} from 'react-redux'
import {addNewBook} from '../reducers/book'
import BookForm from './book-form'

class AddBook extends React.Component {
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addBook(this.state)
    this.setState({
      title: '',
      price: 0,
      description: '',
      quantity: ''
    })
    alert('Book successfully added')
  }

  render() {
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
  return {addBook: book => dispatch(addNewBook(book))}
}

const ConnectedAddBook = connect(null, mapDispatchToProps)(AddBook)

export default ConnectedAddBook
