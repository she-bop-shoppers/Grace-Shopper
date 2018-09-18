import React from 'react'
import {connect} from 'react-redux'
//import ReviewForm from './ReviewForm'
import {postOneReview} from '../reducers/review'
import {withRouter} from 'react-router-dom'

class AddReview extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   userName: '',
    //   review: ''
    // }
    //this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  handleSubmit(event) {
    event.preventDefault()
    console.log('Props: ', this.props.book)

    const bookId = this.props.book.id
    const reviewDate = Date.now()
    const newReview = event.target.review.value
    const user = this.props.user
    this.props.addReview(user.id, newReview, bookId, reviewDate)
  }

  render() {
    const user = this.props.user
    return (
      <div>
        {Object.keys(user).length ? (
          <form onSubmit={this.handleSubmit}>
            <div className="form-input">
              <label htmlFor="review">Review:</label>
              <textarea type="text" id="input-field" name="review" />
            </div>
            <button type="submit">Submit</button>
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
    addReview: (userId, newReview, id, date) => {
      const addReview = {
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
