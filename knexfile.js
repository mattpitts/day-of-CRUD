// Update with your config settings.

module.exports = {
  	development: {
    	client: 'pg',
    	connection: 'postgres://localhost/matts-contacts'
	},
	test: {
    	client: 'pg',
    	connection: 'postgres://localhost/test-matts-contacts'
	},
	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL
	}
};
