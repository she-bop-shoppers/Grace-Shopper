import React from 'react'
import {connect} from 'react-redux'

class BookForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="form-input">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="input-field"
            name="title"
            onChange={this.props.handleChange}
            value={this.props.state.title}
          />
        </div>

        <div className="form-input">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="input-field"
            name="price"
            onChange={this.props.handleChange}
            value={this.props.state.price}
          />
        </div>

        <div className="form-input">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="input-field"
            name="description"
            onChange={this.props.handleChange}
            value={this.props.state.description}
          />
        </div>

        <div className="form-input">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="text"
            id="input-field"
            name="quantity"
            onChange={this.props.handleChange}
            value={this.props.state.quantity}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default BookForm
