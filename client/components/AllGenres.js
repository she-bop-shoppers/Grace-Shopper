import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllGenres extends React.Componnent {
  render() {
    if (!this.props.genres) {
      return (
        <div>
          <h1>Loading . . .</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Genres</h1>
          <ul>{this.props.genres.map(genre => <li key={genre.id} />)}</ul>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres
  }
}
