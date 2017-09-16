const app = require('../../app.js');

const request = require('supertest').agent(app.listen());


// post /api/user {name: 'evan'} ->
// status: 200, message: 'ok', set-cookie: "foo" 

