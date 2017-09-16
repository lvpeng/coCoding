const MongoClient = require('mongodb').MongoClient;

async function getUserList(ctx) {
  const db = await MongoClient.connect('mongodb://localhost:27017/test2');
  const collection = db.collection('users');
  let users;
  try {
    users = await collection.find({}).toArray();
    db.close();
    return ctx.render('../views/partials/userlist', {
      users,
    });
  } catch (e) {
    throw new Error(e);
  }
  // return users;
}

module.exports = getUserList;
