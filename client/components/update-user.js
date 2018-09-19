import React from 'react'
import {connect} from 'react-redux'
import {editedUser} from '../reducers/user'
import axios from 'axios'

class UpdateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      isAdmin: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  async componentDidMount() {
    const response = await axios.get(`/api/users/${this.props.match.params.id}`)
    const user = response.data
    console.log(user)
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

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.match.params.id, this.state)
    alert('User successfully updated')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.isAdmin ? (
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
        ) : (
          <div />
        )}
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

const mapDispatchToProps = dispatch => {
  return {updateUser: (userId, user) => dispatch(editedUser(userId, user))}
}

const ConnectedUpdateUser = connect(null, mapDispatchToProps)(UpdateUser)
export default ConnectedUpdateUser
