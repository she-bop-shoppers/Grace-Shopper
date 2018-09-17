import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {fetchUsers, removeAUser} from '../reducers/user'

class AllUsers extends Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      userId: '',
      addRedirect: false,
      updateRedirect: false
    }
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  setAddRedirect = () => {
    this.setState({
      addRedirect: true
    })
  }

  setUpdateRedirect = userId => {
    this.setState({
      userId,
      updateRedirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.addRedirect) {
      return <Redirect to="/addUser" />
    }
    if (this.state.updateRedirect) {
      return <Redirect to={`/updateUser/${this.state.userId}`} />
    }
  }

  handleDelete(id) {
    this.props.removeUser(id)
  }

  render() {
    const {users} = this.props

    return (
      <div>
        <h1>Users</h1>
        <div>
          {this.renderRedirect()}
          <button type="submit" onClick={this.setAddRedirect}>
            Add New User
          </button>
        </div>
        <table>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>isAdmin</th>
            <th>Remove</th>
            <th>Update</th>
          </tr>
          {users &&
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{user.isAdmin ? 'True' : 'False'}</td>
                  <td>
                    {' '}
                    <button
                      type="submit"
                      onClick={() => this.handleDelete(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    {this.renderRedirect()}
                    <button
                      type="submit"
                      onClick={() => this.setUpdateRedirect(user.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
        </table>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    removeUser: id => dispatch(removeAUser(id))
  }
}

const mapStateToProps = state => {
  return {users: state.user.allUsers, isAdmin: state.user.isAdmin}
}

const ConnectedAllUsers = connect(mapStateToProps, mapDispatchToProps)(AllUsers)

export default ConnectedAllUsers
