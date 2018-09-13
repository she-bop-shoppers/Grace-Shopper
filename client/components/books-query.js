import React from 'react'
import {connect} from 'react-redux'
import {getBooks} from '../reducers/'
import Select from '@material-ui/core/Select'

/**
 * COMPONENT
 */
class BooksQuery extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '',
      value: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target)
    // this.setState({
    //   type: event.target.name,
    //   value: event.target.value
    // })
  }

  render() {
    //const {books} = this.props

    return (
      <div>
        <h3>Search</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="search-select">
            <label htmlFor="search-select">Search by:</label>
            <select id="search-select">
              <option value="">--Please choose an option--</option>
              <option value="genre">Genre</option>
              <option value="title">Title</option>
              <option value="author">Author</option>
            </select>
          </div>

          <div className="search-input">
            <label htmlFor="search-input">Search for:</label>
            <input type="text" id="search-input" name="value" />
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
