import React from 'react'
import {connect} from 'react-redux'
//import ReviewForm from './ReviewForm'
import {postOneReview} from '../reducers/review'

class AddReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      review: ''
    }
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
    const userName = event.target.userName.value
    const bookId = this.props.book.id
    const reviewDate = Date.now()
    console.log('Username: ', userName)
    const newReview = event.target.review.value
    console.log('New Review: ', newReview)
    this.props.addReview(userName, newReview, bookId, reviewDate)
    this.setState({
      userName: '',
      review: ''
    })
    alert('Review successfully added')
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-input">
          <label htmlFor="userName">Username:</label>
          <input type="text" id="input-field" name="userName" />
        </div>
        <div className="form-input">
          <label htmlFor="review">Review:</label>
          <textarea type="text" id="input-field" name="review" />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: (userName, newReview, id, date) => {
      const addReview = {
        userName: userName,
        text: newReview,
        bookId: id,
        date: date
      }
      dispatch(postOneReview(addReview))
    }
  }
}
export default connect(null, mapDispatchToProps)(AddReview)
