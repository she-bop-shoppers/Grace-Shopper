import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getGenres} from '../reducers/genres'

class AllGenres extends React.Component {
  componentDidMount() {
    this.props.numerousGenres()
  }
  render() {
    if (this.props.genres && this.props.genres.length) {
      return (
        <div>
          <h1>Genres</h1>
          <ul>
            {this.props.genres.map(genre => (
              <li key={genre.id}>
                <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Loading . . .</h1>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres.allGenres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    numerousGenres: () => dispatch(getGenres())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllGenres)
