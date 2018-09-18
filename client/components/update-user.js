import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

class UserForm extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      isAdmin: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidmount() {
    const response = await axios.get(
      `api/users/${this.props.match.params.bookId}`
    )
    const user = response.data
    this.setState({
      email: user.email,
      isAdmin: user.isAdmin
    })
  }

  handleSelect(event) {
    console.log(event.target.value)
    this.setState({
      isAdmin: event.target.value
    })
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({
      email: event.target.value
    })
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="search-select">
          <label htmlFor="search-select">Admin:</label>
          <select
            id="search-select"
            value={this.state.isAdmin}
            onChange={this.handleSelect}
            placeholder="--Please choose an option--"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>
        <div className="search-input">
          <label htmlFor="search-input">Email:</label>
          <input
            type="text"
            id="search-input"
            name="searchedText"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default UserForm
