'use strict';

const db = require('APP/db');
const User = db.model('users');

const { mustBeLoggedIn, forbidden, assertAdmin } = require('./auth.filters');

module.exports = require('express')
	.Router()
	.use('/', (req, res, next) => {
		req.body.user_id = req.session.passport ? req.session.passport.user : 8000;
		next();
	})
	.use('/cart', require('./cart'))
	.use('/orders', require('./orders'))
	.get('/', forbidden('listing users is not allowed'),
	(req, res, next) => User.findAll().then(users => res.json(users)).catch(next)
	// The forbidden middleware will fail *all* requests to list users.
	// Remove it if you want to allow anyone to list all users on the site.
	//
	// If you want to only let admins list all the users, then you'll
	// have to add a role column to the users table to support
	// the concept of admin users.
	)
	.post('/', (req, res, next) =>
		User.create(req.body).then(user => res.status(201).json(user)).catch(next)
	)
	.get('/:id', mustBeLoggedIn, (req, res, next) =>
		User.findById(req.params.id).then(user => res.json(user)).catch(next)
	)
	.put('/:id', (req, res, next) => {
		User.update(req.body, {
			where: {
				id: req.params.id
			},
			returning: true
		})
			.then(updatedUser => {
				res.json(updatedUser[1]);
			})
			.catch(next);
	})
	.delete('/:id', (req, res, next) => {
		User.destroy({
			where: {
				id: req.params.id
			}
		}).then(() => {
			res.sendStatus(204);
		});
	});
