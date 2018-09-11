import React from 'react'
import {fetchSingleBook} from '../reducers/book'
import {connect} from 'react-redux'

class SingleBook extends React.Component {
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

const mapDispatchToProps = dispatch => {
  return {
    singleBook: id => dispatch(fetchSingleBook(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
