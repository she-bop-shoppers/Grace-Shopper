import React from 'react'
import {connect} from 'react-redux'
import {addNewBook} from '../reducers/book'

class AddBook extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      price: 0,
      description: ''
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
  }

  render() {
    console.log(this.state)
    return (
      <div className="add-form">
        <h3>ADD NEW BOOK</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="input-field"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}
            />
          </div>

          <div className="form-input">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="input-field"
              name="price"
              onChange={this.handleChange}
              value={this.state.price}
            />
          </div>

          <div className="form-input">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="input-field"
              name="description"
              onChange={this.handleChange}
              value={this.state.description}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {addBook: book => dispatch(addNewBook(book))}
}

const ConnectedAddBook = connect(null, mapDispatchToProps)(AddBook)

export default ConnectedAddBook
