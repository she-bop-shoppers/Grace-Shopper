// const configureStripe = require('stripe');

// const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production' ? 'sk_live_MY_SECRET_KEY' : 'sk_test_MY_SECRET_KEY';
// const stripe = configureStripe(STRIPE_SECRET_KEY);

// const postStripeCharge = (res) => (stripeErr, stripeRes) => {
// 	if (stripeErr) {
// 		res.status(500).send({ error: stripeErr });
// 	} else {
// 		res.status(200).send({ success: stripeRes });
// 	}
// };

// const paymentApi = (app) => {
// 	app.get('/', (req, res) => {
// 		res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() });
// 	});

// 	app.post('/', (req, res) => {
// 		stripe.charges.create(req.body, postStripeCharge(res));
// 	});

// 	return app;
// };

// const configureRoutes = (app) => {
// 	paymentApi(app);
// };

// module.exports = configureRoutes;
