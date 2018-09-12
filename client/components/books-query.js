import React from 'react'
import {connect} from 'react-redux'
import {getQueriedBooks} from '../reducers/'

/**
 * COMPONENT
 */
class BooksQuery extends React.Component {
  constructor() {
    super()
    this.state = {
      queryType: '',
      queryValue: ''
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      queryType: event.target.name,
      queryValue: event.target.value
    })
  }

  render() {
    const {books} = this.props

    return (
      <div>
        <h3>Please filter by type</h3>
        <form action="/" method="get" onSubmit={this.handleSubmit}>
          <div className="form-input">
            <label htmlFor="type">Type:</label>
            <input type="text" id="input-field" name="type" />
          </div>

          <div className="form-input">
            <label htmlFor="value">Search for:</label>
            <input type="text" id="input-field" name="value" />
          </div>

          <button type="submit">Submit</button>
        </form>
        {books}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    books: state.books.booksMatchingQuery
  }
}

const mapDispatch = dispatch => {
  return {
    getGenreBooks: queryDetails => dispatch(getQueriedBooks(queryDetails))
  }
}

export default connect(mapState, mapDispatch)(BooksQuery)
