'use strict';

const food = (sequelize, DataTypes) =>
    sequelize.define('food', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

module.exports = food;