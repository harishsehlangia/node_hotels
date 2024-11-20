const express = require('express');
const router = express.Router();
const menuItem = require('./../models/menuItem');

// POST Route to add a menuItem
router.post('/', async (req, res) =>{
    try{
        const data = req.body;
        const newMenu = menuItem(data);
        const response = await newMenu.save();

        console.log('data saved');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

// GET method to get the item
router.get('/', async (req, res) =>{
    try{
        const data = await menuItem.find();
        console.log('data fatched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

// parameterized GET Route for menu
router.get('/:taste', async (req, res) =>{
    try{
        const Taste = req.params.taste;
        if(Taste == 'Spicy' || Taste == 'Sweet' || Taste == 'Sour'){
            const response = await menuItem.find({taste: Taste});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid taste type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;