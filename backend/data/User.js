const fs = require('fs').promises;
const connection = require('./connectionMongo');

async function findUserByUsername(userName){
    const connectionMongo = await connection.getConnection();
    const user = await connectionMongo.db('Ecommerce')
                        .collection('usuarios')
                        .findOne({ _id: userName });
    return user;
};

async function pushUser(user){
    const connectionMongo = await connection.getConnection();
    const result = await connectionMongo.db('Ecommerce')
                        .collection('usuarios')
                        .insertOne(user);
    return result;
};

async function recoverUser(user){
    const connectionMongo = await connection.getConnection();
    const query = {_id: user.username}
    const newvalues = {
        $set: {
            password : user.password
        }
    }
    const result = await connectionMongo.db('Ecommerce')
                        .collection('usuarios')
                        .updateOne(query, newvalues);
    return result;
}

module.exports = {findUserByUsername, pushUser, recoverUser}