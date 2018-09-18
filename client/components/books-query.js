import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {getBooks} from '../reducers/book'
import {Redirect} from 'react-router'
import {
  Select,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Button
} from '@material-ui/core'

/**
 * COMPONENT
 */
class BooksQuery extends React.Component {
  constructor() {
    super()
    this.state = {
      type: '--Please choose an MenuItem--',

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
      type: '--Please choose an MenuItem--',
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
        <form
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justify: 'flex-end'
          }}
          onSubmit={this.handleSubmit}
        >
          <FormControl>
            {/* <div className="search-select"> */}
            <InputLabel htmlFor="search-select" />
            <Select
              style={{padding: 0}}
              // id="search-select"
              value={this.state.type}
              onChange={this.handleSelect}
              inputProps={{
                name: 'Genre',
                id: 'search-select'
              }}
            >
              <MenuItem value="genreId">Genre</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="authorId">Author (last name)</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="search-input" />
            <TextField
              style={{padding: 0}}
              type="text"
              id="search-input"
              name="searchedText"
              placeholder="Search"
              margin="normal"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </FormControl>

          <Button type="submit">Submit</Button>
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
