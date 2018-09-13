import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class SingleBook extends React.Component {
  componentDidMount() {
    const bookId = Number(this.props.match.params.bookId)
    this.props.singleBook(bookId)
  }
  render() {
    console.log('Book', this.props.book.author)
    return (
      <div>
        <h1>{this.props.book.title}</h1>
        <img src={this.props.book.imageUrl} />
        <p>{this.props.book.description}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.books.singleBook
  }
}

const mapDispatchToProps = dispatch => {
  return {
    singleBook: bookId => dispatch(fetchSingleBook(bookId))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleBook)
)
