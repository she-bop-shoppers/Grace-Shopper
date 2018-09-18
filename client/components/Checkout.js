import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
// import Stripe from 'stripe';

const CURRENCY = 'USD'

//const fromEuroToCent = (amount) => amount * 100;

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment Error')
}

const onToken = (amount, email) => token =>
  axios
    .post('http://localhost:8080', {
      source: token.id,
      currency: CURRENCY,
      email: email,
      amount: amount
      // stripeKey: 'pk_test_YAlUZYaNl5zFPT7p9mIRXArS'
    })
    .then(successPayment)
    .catch(errorPayment)

const Checkout = props => {
  let totalPrice = 0
  props.books.forEach(book => {
    totalPrice += book.quantity * book.price
  })
  totalPrice *= 100
  console.log('this is book price', totalPrice)
  return (
    <StripeCheckout
      email={props.email}
      amount={totalPrice}
      token={onToken(totalPrice, props.email)}
      stripeKey="pk_test_YAlUZYaNl5zFPT7p9mIRXArS"
      currency={CURRENCY}
    />
  )
}

export default Checkout
