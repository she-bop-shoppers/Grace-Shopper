import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, userId} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <button type="submit">
        <Link to={`/updateUser/${userId}`}>Update</Link>
      </button>
      <blockquote>
        <h3>"So many books, so little time."</h3> <p>- Frank Zappa</p>
      </blockquote>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userId: state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
