const express = require('express');
const router = express.Router();
const Person = require('./../models/person');



// POST route to add a person --------------------
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        // Create a new Person document using the "mongoose model"
        const newPerson = new Person(data);

        // Save the new Person to database
        const response = await newPerson.save()
        console.log('data saved');
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


// GET method to get the Person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


// Parameterized Get Method for person work..
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


// PUT Route for Update the person 
router.put('/:id', async (req, res) => {
    try {
        const personID = req.params.id; // Extract the id from the URL Parameter
        const updatedPersonData = req.body; // Update data for the person

        const response = await Person.findByIdAndUpdate(personID, updatedPersonData, {
            new: true, // Return the updated Version
            runValidators: true, // Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({eror: 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

// Delet Route For Deleting the person
router.delete('/:id', async (req, res)=> {
    try{
        const personID = req.params.id;

        // Assuming you have Person Model
        const response = await Person.findByIdAndDelete(personID);

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({messege: 'Person deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;