export const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://myapidomain.com'
    : 'http://localhost:8080'

export const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_MY_PUBLISHABLE_KEY'
