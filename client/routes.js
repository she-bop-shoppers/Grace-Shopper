import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import ConnectedAllBooks from './components/allBooks'
import ConnectedAddBook from './components/add-book'
import ConnectedBooksQuery from './components/books-query'
import AllAuthors from './components/allAuthors'
import SingleBook from './components/SingleBook'
import Cart from './components/Cart'
import AllGenres from './components/AllGenres'
import SingleGenre from './components/SingleGenre'
import SingleAuthor from './components/SingleAuthor'
import {me} from './reducers/user'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/books" component={ConnectedAllBooks} />
        <Route path="/books/:bookId" component={SingleBook} />
        <Route exact path="/authors" component={AllAuthors} />
        <Route exact path="/cart" component={Cart} />
        <Route path="/authors/:authorId" component={SingleAuthor} />
        <Route exact path="/genres" component={AllGenres} />
        <Route path="/genres/:genreId" component={SingleGenre} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/addBook" component={ConnectedAddBook} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={ConnectedAllBooks} />
        <Route path="/query" component={ConnectedBooksQuery} />
        <Route path="/" component={ConnectedAllBooks} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
