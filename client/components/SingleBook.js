import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {connect} from 'react-redux'

class SingleBook extends React.Component {
  componentDidMount() {
    this.props.singleBook()
  }
  render() {
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
    book: state.singleBook
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    singleBook: () => dispatch(fetchSingleBook(ownProps.match.params.booksId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
