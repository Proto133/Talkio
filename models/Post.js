const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create fields/columns for Post model
const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post_content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    }
    // postSnip: {
    //     type: DataTypes.VIRTUAL,
    //     get() {
    //         let word = post_content.split(" ")
    //         const snippet = [];
    //         for (let i = 0; i < 25; i++) {
    //             let words = post_content[i].split(' ');
    //             snippet.push(words)
    //         }
    //         return `${this.firstName} ${this.lastName}`;
    //     }
    // },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Post'
});

module.exports = Post