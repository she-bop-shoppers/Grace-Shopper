import React from 'react'

const ReviewForm = props => {
  const handleSubmit = props.handleSubmit
  return (
    <form onSubmit={handleSubmit}>
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

export default ReviewForm
