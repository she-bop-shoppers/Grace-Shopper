import React from 'react'

class Quantity extends React.Component {
  constructor() {
    super()
    this.state = {quantity: 0}
    this.handleQuantity = this.handleQuantity.bind(this)
  }

  handleQuantity(event) {
    this.setState({quantity: event.target.value})
  }

  render() {
    return (
      <div>
        <div>
          Quantity:
          {/* <select onChange={this.handleQuantity} value={this.state.quantity}>
						{[ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ].map((each) => {
							return (
								<option key={each} value={each + ''}>
									{each}
								</option>
							);
						})}
					</select> */}
        </div>{' '}
      </div>
    )
  }
}

export default Quantity

//withRouter(connect(mapStateToProps, mapDispatchToProps)
