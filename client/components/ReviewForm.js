import React from 'react'

const ReviewForm = props => {
  const handleSubmit = props.handleSubmit
  const handleChange = props.handleChange
  const userName = props.state.userName
  const review = props.state.review
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-input">
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="input-field"
          name="userName"
          onChange={handleChange}
          value={userName}
        />
      </div>
      <div className="form-input">
        <label htmlFor="review">Review:</label>
        <textarea
          type="text"
          id="input-field"
          name="review"
          onChange={handleChange}
          value={review}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ReviewForm
