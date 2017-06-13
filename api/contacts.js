const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

function isValidId(req,res,next) {
	if(!isNaN(req.params.id)) return next();
	next(new Error('Invalid id'));
}

function isValidContact(contact) {
	const hasFirstName = typeof contact.firstname == 'string' && contact.firstname.trim() != '';
	const hasLastName = typeof contact.lastname == 'string' && contact.lastname.trim() != '';
	return hasFirstName && hasLastName;
}

router.get('/', (req, res) => {
	queries.getAll().then(contacts => {
		res.json(contacts);
	});
});


router.get('/:id', isValidId, (req, res, next) => {
	queries.getById(req.params.id).then(contact => {
		if(contact) {
			res.json(contact);
		} else {
			next();
		}
	});
});


router.post('/', (req,res,next) => {
	if(isValidContact(req.body)) {
		queries.addContact(req.body).then(contact => {
			res.json(contact[0]);
		});
	} else {
		next(new Error('Invalid contact'));
	}
});

router.put('/:id', isValidId, (req,res,next) => {
	if(isValidContact(req.body)) {
		queries.updateById(req.params.id, req.body).then(contacts => {
			res.json(contacts[0]);
		});
	} else {
		next(new Error('Invalid contact'));
	}
});

router.delete('/:id', isValidId, (req,res) => {
	queries.deleteById(req.params.id).then(() => {
		res.json({
			deleted: true
		});
	});
});


module.exports = router;
