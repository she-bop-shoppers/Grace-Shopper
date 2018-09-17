import React from 'react'
import {connect} from 'react-redux'
import {getSingleAuthor} from '../reducers/author'
import {Link} from 'react-router-dom'

class SingleAuthor extends React.Component {
  componentDidMount() {
    const id = Number(this.props.match.params.authorId)
    this.props.getOneAuthor(id)
  }

  render() {
    return (
      <div>
        <h1>{this.props.oneAuthor.fullName}</h1>
        <img src={this.props.oneAuthor.imageUrl} />
        <p>{this.props.oneAuthor.bio}</p>
        <h3>Books by {this.props.oneAuthor.fullName}</h3>
        <ul>
          {this.props.oneAuthor.books ? (
            this.props.oneAuthor.books.map(book => (
              <li key={book.id}>
                <Link to={`/books/${book.id}`}>{book.title}</Link>
              </li>
            ))
          ) : (
            <div>
              <h1>Loading . . .</h1>
            </div>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    oneAuthor: state.authors.selectedAuthor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOneAuthor: id => dispatch(getSingleAuthor(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleAuthor)
