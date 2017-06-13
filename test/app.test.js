const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex')

const app = require('../app');

const fixtures = require('./fixtures');

describe('CRUD Contacts', () => {
	before((done) => {    // runs before any tests
		//run migrations
		knex.migrate.latest()
			.then(() => {
			//run seeds
				return knex.seed.run();
			}).then(() => done());
	});
	it('Should list all contacts', (done) => {
		request(app)
			.get('/api/contacts/')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('array');
				expect(response.body).to.deep.equal(fixtures.contacts);
				done();

			});
	});
	it('Should get a contact by id', (done) => {
		request(app)
			.get('/api/contacts/2')
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal(fixtures.contacts[1]);
				done();

			});
	});
	it('Can add a contact to the database', (done) => {
		request(app)
			.post('/api/contacts')
			.send(fixtures.contact)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				fixtures.contact.id = response.body.id;
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal(fixtures.contact);
				done();
			});
	});
	it('Should update a contact by id', (done) => {
		fixtures.contact.rating = 3;
		fixtures.contact.id = 2;
		request(app)
			.put('/api/contacts/2')
			.send(fixtures.contact)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal(fixtures.contact);
				done();

			});
	});
	it('Should delete a contact by id', (done) => {
		fixtures.contact.rating = 3;
		fixtures.contact.id = 2;
		request(app)
			.delete('/api/contacts/2')
			.send(fixtures.contact)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).to.be.a('object');
				expect(response.body).to.deep.equal({deleted: true});
				done();

			});
	});
});
