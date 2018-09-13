import React from 'react'
import {connect} from 'react-redux'
import {getBooks} from '../reducers/book'
import {Redirect} from 'react-router'
import Select from '@material-ui/core/Select'

/**
 * COMPONENT
 */
class BooksQuery extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '--Please choose an option--',
      value: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.getBooks(this.state)
  }

  handleSelect(event) {
    console.log(event.target.value)
    this.setState({
      type: event.target.value
    })
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      value: event.target.value
    })
  }

  render() {
    //const {books} = this.props

    return (
      <div>
        <h3>Search</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="search-select">
            <label htmlFor="search-select">Search by:</label>
            <select
              id="search-select"
              value={this.state.type}
              onChange={this.handleSelect}
            >
              <option value="">{this.state.type}</option>
              <option value="genre">Genre</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>

          <div className="search-input">
            <label htmlFor="search-input">Search for:</label>
            <input
              type="text"
              id="search-input"
              name="searchedText"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    books: state.books.allBooks
  }
}

const mapDispatch = dispatch => {
  return {
    getBooks: queryDetails => dispatch(getBooks(queryDetails))
  }
}

export default connect(mapState, mapDispatch)(BooksQuery)
