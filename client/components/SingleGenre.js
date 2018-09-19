import React from 'react'
import {connect} from 'react-redux'
import {getSingleGenre} from '../reducers/genres'
import {Link} from 'react-router-dom'

class SingleGenre extends React.Component {
  componentDidMount() {
    const genreId = Number(this.props.match.params.genreId)
    this.props.unoGenre(genreId)
  }

  render() {
    return (
      <div>
        <h1>{this.props.oneGenre.name}</h1>
        <ul>
          {this.props.oneGenre.books ? (
            this.props.oneGenre.books.map(book => (
              <li key={book.id}>
                <img src={book.imageUrl} />
                <Link to={`/books/${book.id}`}>
                  {book.title} by{' '}
                  {book.author.firstName + ' ' + book.author.lastName}
                </Link>
              </li>
            ))
          ) : (
            <li>Loading . . .</li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    oneGenre: state.genres.singleGenre
  }
}

const mapDispatchToProps = dispatch => {
  return {
    unoGenre: genreId => dispatch(getSingleGenre(genreId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleGenre)
