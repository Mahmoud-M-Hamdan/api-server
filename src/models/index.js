'use strict';



const {Sequelize,DataTypes} = require('sequelize');

require('dotenv').config();

const DATABASE_URL = process.env.NODE_ENV = 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV = 'production' ? {
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        }
      }
} : {};

let sequelize = new Sequelize(DATABASE_URL,sequelizeOptions);

const customerSchema = require('./customer');
const foodSchema = require('./food');

const customerModel = customerSchema(sequelize,DataTypes);
const foodModel = foodSchema(sequelize,DataTypes);

customerModel.hasMany(foodModel,{foreignKey:'customerId',sourceKey:'id'});
foodModel.belongsTo(customerModel,{foreignKey:'customerId',targetKey:'id'})

const Collection = require('./collection-class');

const customerCollection = new Collection(customerModel);
const foodCollection = new Collection(foodModel);


module.exports = {
    db: sequelize,
    customerCollection: customerCollection,
    foodCollection: foodCollection
}