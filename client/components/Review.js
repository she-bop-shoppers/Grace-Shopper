import React from 'react'
import {connect} from 'react-redux'
import {fetchReviews} from '../reducers/review'

class Review extends React.Component {
  componentDidMount() {
    this.props.getReviews()
  }
  render() {
    const book = this.props.book
    console.log('book: ', book)
    const reviews = book.reviews
    // console.log('reviews: ', this.props.reviews)
    const reviewsList = this.props.reviews
    console.log('ReviewList: ', reviewsList)

    let filteredList = reviewsList.filter(review => {
      return review.book.id === review.BookId
    })
    console.log('Filtered List: ', filteredList)

    return (
      <div>
        <h2>
          Reviews for <em>{book.title}</em>
        </h2>
        <div>
          {reviews ? (
            reviews.map(review => {
              return <p key={review.id}>"{review.text}"</p>
            })
          ) : (
            <h4>
              There are no reviews for this book. Would you like to be the first
              to add a review?
            </h4>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews: () => dispatch(fetchReviews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
