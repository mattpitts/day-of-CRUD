
exports.up = function(knex, Promise) {
	return knex.schema.createTable('contact', (table) => {
		table.increments();
		table.text('firstname').notNullable();
		table.text('lastname').notNullable();
		table.text('address');
		table.text('phone');
		table.text('email');
		table.float('rating');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('contact');
};
