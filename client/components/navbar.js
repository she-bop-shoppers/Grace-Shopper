import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../reducers/user'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>Grace Shopper</h1>
    <AppBar>
      <Toolbar>
        {isLoggedIn ? (
          <div>
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>{' '}
          </div>
        ) : (
          <div />
        )}
        {isAdmin ? (
          <div>
            <Link to="/addBook">Add Book</Link>
          </div>
        ) : (
          <div />
        )}
        {/* The navbar will show these links before you log in */}
        <Link to="/books">Books</Link>
        <Link to="/genres">Genres</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/cart">Cart</Link>
      </Toolbar>
    </AppBar>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
