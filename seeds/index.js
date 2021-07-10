const sequelize = require('../config/connection');
// const seedBlogPosts = require('./blogPostsData');
const seedUser = require('./userData');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    // await seedBlogPosts();

    await seedUser();

    process.exit(0);
};

seedAll();