const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

const User = sequelize.define({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
            },
            set(value) {
                throw new Error("Can't set `fullName` value!");
            }
        },
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(loginPW) {
                return bcrypt.compareSync(loginPW, this.password);
            }
        },
    }

);

module.exports = User