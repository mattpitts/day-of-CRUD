const knex = require('./knex'); //the connection (not the library)

module.exports = {
	getAll() {
		return knex('contact');
	},
	addContact(contact) {
		return knex('contact').insert(contact, '*');
	},
	getById(id) {
		return knex('contact').where('id', id).first();
	},
	updateById(id,contact) {
		return knex('contact').where('id', id).update(contact, '*');
	},
	deleteById(id) {
		return knex('contact').where('id', id).del();
	}
};
