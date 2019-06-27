import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

import initializeDb from './db';
import middleware from './middleware';
import setApi from './models/api';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders,
	credentials: true,
	origin: 'http://localhost:8081'
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use(session({
	resave: false, // don't save session if unmodified  
	saveUninitialized: false, // don't create session until something stored  
	secret: 'aylin'
}))


// connect to db
initializeDb( db => {
	// internal middleware, and this is an Array, which includes all customrize middleware
	middleware.forEach(middleware => {
		app.use(middleware);
	})

	// api router
	setApi(app, db);

	app.server.listen(process.env.PORT || config.port, () => {
		console.log(`Started on port ${app.server.address().port}`);
	});
});

export default app;
