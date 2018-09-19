import React from 'react'
import {connect} from 'react-redux'
import {fetchReviews, deleteReview} from '../reducers/review'
import StarRatings from 'react-star-ratings'

class Review extends React.Component {
  constructor() {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.getReviews()
  }

  handleDelete(id) {
    this.props.deleteReview(id)
  }

  render() {
    const book = this.props.book
    const reviewsList = this.props.reviews
    let reviews = reviewsList.filter(review => book.id === review.bookId)

    return (
      <div>
        <section className="review-product">
          <div id="title">
            <h2>
              Reviews for <em>{book.title}</em>
            </h2>
          </div>

          <div>
            {reviews && reviews.length ? (
              reviews.map(review => {
                return (
                  <div id="stars-and-text" key={review.id}>
                    <p id="review-text">"{review.text}"</p>
                    <StarRatings
                      starEmptyColor="red"
                      starDimension="25px"
                      numberOfStars={review.rating}
                    />
                    {this.props.isAdmin ? (
                      <div>
                        <button
                          type="submit"
                          onClick={() => this.handleDelete(review.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                )
              })
            ) : (
              <div>
                <h4>
                  There are no reviews for this book. Would you like to be the
                  first to add a review?
                </h4>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.reviews.reviews,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getReviews: () => dispatch(fetchReviews()),
    deleteReview: reviewId => dispatch(deleteReview(reviewId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
