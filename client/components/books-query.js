import React from 'react'
import axios from 'axios'
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

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.type === 'genreId') {
      try {
        let res = await axios.get(`api/genres?name=${this.state.value}`)
        let id = res.data[0].id
        this.setState({
          value: id
        })
      } catch (err) {
        alert('Invalid search criteria')
      }
    }
    if (this.state.type === 'authorId') {
      try {
        let res = await axios.get(`api/authors?lastName=${this.state.value}`)
        let id = res.data[0].id
        this.setState({
          value: id
        })
      } catch (err) {
        alert('Invalid search criteria')
      }
    }
    this.props.getBooks(this.state)
    this.setState({
      type: '--Please choose an option--',
      value: ''
    })
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
              placeholder="--Please choose an option--"
            >
              <option value="">--Please choose an option--</option>
              <option value="genreId">Genre</option>
              <option value="title">Title</option>
              <option value="authorId">Author (last name)</option>
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
