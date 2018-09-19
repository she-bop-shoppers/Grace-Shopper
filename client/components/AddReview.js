import React from 'react'
import {connect} from 'react-redux'
//import ReviewForm from './ReviewForm'
import {postOneReview} from '../reducers/review'
import {withRouter} from 'react-router-dom'
import StarRatings from 'react-star-ratings'

class AddReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      review: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeRating = this.changeRating.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('Props: ', this.props.book)

    const bookId = this.props.book.id
    const reviewDate = Date.now()
    const newReview = this.state.review
    const user = this.props.user
    this.props.addReview(
      this.state.rating,
      user.id,
      newReview,
      bookId,
      reviewDate
    )
    this.setState({
      rating: 0,
      review: ''
    })
  }

  render() {
    const user = this.props.user
    return (
      <div>
        {Object.keys(user).length ? (
          <form onSubmit={this.handleSubmit}>
            <section className="add-review">
              <div className="form-input">
                <label htmlFor="review">
                  <br />
                  <br />

                  <h3>
                    Review <em>{this.props.book.title}</em>
                  </h3>
                </label>
                <br />
                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="red"
                  starEmptyColor="coral"
                  starDimension="25px"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name="rating"
                />
                <textarea
                  type="text"
                  id="input-field"
                  name="review"
                  onChange={this.handleChange}
                  value={this.state.review}
                />
              </div>
              <button type="submit">Add Review</button>
              <br />
            </section>
          </form>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (rating, userId, newReview, id, date) => {
      const addReview = {
        rating: rating,
        userId: userId,
        text: newReview,
        bookId: id,
        date: date
      }
      dispatch(postOneReview(addReview))
    }
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddReview)
)
