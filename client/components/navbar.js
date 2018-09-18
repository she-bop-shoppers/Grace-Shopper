import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../reducers/user'
import {AppBar, Toolbar, Typography, Tab, Tabs} from '@material-ui/core'
import Admin from './admin'
import Genres from './AllGenres'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div>
          <ul>
            <li>
              <Link to="/home">HOME</Link>
            </li>
            <li>
              <Link to="/books">BOOKS</Link>
            </li>
            <Genres />
            <li>
              <Link to="/pastorders">ORDERS</Link>
            </li>
            <li>
              <Link to="/cart">CART</Link>
            </li>
            {isAdmin ? <Admin /> : <li />}
            <li>
              <a href="#" onClick={handleClick}>
                LOGOUT
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <Genres />
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
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
