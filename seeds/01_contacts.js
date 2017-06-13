const contacts = require('../contacts');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('TRUNCATE contact RESTART IDENTITY CASCADE;')
    .then(function () {
      // Inserts seed entries
      return knex('contact').insert(contacts);
    });
};
