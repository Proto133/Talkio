const { User } = require('../models');

const userdata = [{

        name: 'Gerald Plotke',
        github: 'GPLOTKE',
        username: 'JERRY',
        email: 'test@example.com',
        password: 'Password'
    }, {

        name: 'Matt Callahan',
        github: 'mattcllhn',
        username: 'mattCAL',
        email: 'test2@example.com',
        password: 'Password1'
    },

];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;