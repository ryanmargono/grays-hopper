'use strict';

const db = require('APP/db');
const Cart = db.model('cart');
const Beer = db.model('beer');

module.exports = require('express')
	.Router()
	.get('/', (req, res, next) => {
		Cart.findOne({
			where: {
				user_id: req.params.id
			},
			include: [Beer]
		})
			.then(cart => res.json(cart))
			.catch(next);
	})
	.post('/', (req, res, next) => {
		Cart.create(req.body)
			.then(addedItem => {
				res.json(addedItem);
			})
			.catch(next);
	})
	.put('/', (req, res, next) => {
		Cart.update(req.body, {
			where: {
				user_id: req.params.id
			},
			include: [Beer],
			returning: true
		})
			.then(updatedCart => {
				res.json(updatedCart);
			})
			.catch(next);
	})
	.delete('/:beerId', (req, res, next) => {
		Cart.destroy({
			where: {
				beer_id: req.params.beerId
			}
		}).then(() => {
			res.sendStatus(200);
		});
	});
