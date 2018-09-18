import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    // User clicked submit
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit} type="submit">
          Send
        </button>
      </div>
    )
  }
}

export default injectStripe(Checkout)

// import React from 'react';
// import axios from 'axios';
// import StripeCheckout from 'react-stripe-checkout';

// import { STRIPE_PUBLISHABLE, PAYMENT_SERVER_URL } from './Stripe';

// const CURRENCY = 'EUR';

// const fromEuroToCent = (amount) => amount * 100;

// const successPayment = (data) => {
// 	alert('Payment Successful');
// };

// const errorPayment = (data) => {
// 	alert('Payment Error');
// };

// const onToken = (amount, description) => (token) =>
// 	axios
// 		.post(PAYMENT_SERVER_URL, {
// 			description,
// 			source: token.id,
// 			currency: CURRENCY,
// 			amount: fromEuroToCent(amount)
// 		})
// 		.then(successPayment)
// 		.catch(errorPayment);

// const Checkout = ({ email, address, amount }) => (
// 	<StripeCheckout
// 		email={email}
// 		address={address}
// 		amount={fromEuroToCent(amount)}
// 		token={onToken(amount, address)}
// 		currency={CURRENCY}
// 		stripeKey={STRIPE_PUBLISHABLE}
// 	/>
// );

// export default Checkout;
