'use strict';

const express = require('express');

const router = express.Router();

const {foodCollection} = require('../models/index');

router.get('/food',getFood);
router.post('/food',createFood);


async function getFood(req,res) {
    let food = await foodCollection.read();
    res.status(200).json(food);
}

async function createFood(req,res) {
    let newFoodInfo = req.body;
    let food = await foodCollection.create(newFoodInfo);
    res.status(201).json(food);
}

module.exports = router;