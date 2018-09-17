import React from 'react'
import {connect} from 'react-redux'
import ReviewForm from './ReviewForm'
import postOneReview from '../reducers/review'

class AddReview extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      review: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addReview(this.state)
    this.setState({
      userName: '',
      review: ''
    })
    alert('Review successfully added')
  }

  render() {
    // const style = {
    //   height
    // }
    return (
      <ReviewForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
      />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addReview: review => dispatch(postOneReview(review))
  }
}
export default connect(null, mapDispatchToProps)(AddReview)
