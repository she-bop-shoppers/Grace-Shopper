// const cors = require('cors');
// const bodyParser = require('body-parser');

// const FRONTEND_DEV_URLS = [ 'http://localhost:8080' ];
// const FRONTEND_PROD_URLS = [ 'https://www.yourdomain.com', 'https://yourdomain.com' ];
// const CORS_WHITELIST = process.env.NODE_ENV === 'production' ? FRONTEND_PROD_URLS : FRONTEND_DEV_URLS;

// const corsOptions = {
// 	origin: (origin, callback) =>
// 		CORS_WHITELIST.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
// };

// const configureServer = (app) => {
// 	app.use(cors(corsOptions));

// 	app.use(bodyParser.json());
// };

// module.exports = configureServer;
