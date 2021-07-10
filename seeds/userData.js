const { User } = require('../models');

const userdata = [{
        fistName: 'John',
        lastName: 'Doe',
        username: 'JohnDoe',
        email: 'test@example.com',
        password: 'Password'
    }, {
        firstName: 'Jane',
        lastName: 'Doe',
        username: 'JaneDoe',
        email: 'test2@example.com',
        password: 'Password1'
    }

];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;