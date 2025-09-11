const joi = require('joi');
const { Attraction } = require('../models/Attraction');
const { appendFile } = require('fs');

module.exports = {
    // Get all attractions
    getAll: async function (req, res, next) {
        try {
            const attractions = await Attraction.find({});
            res.json(attractions);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Error getting attractions' });
        }
    },

    // Get one attraction by ID
    getOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);
            if (error) throw new Error(error.details[0].message);

            const attraction = await Attraction.findById(value.id);
            if (!attraction) throw new Error("No attraction found with this ID.");
            res.json(attraction);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message || "Invalid data" });
        }
    },

    // Add a new attraction
    addNew: async function (req, res, next) {
        try {
            const schema = joi.object({
                name: joi.string().min(2).max(256).required(),
                city: joi.string().min(2).max(256).required(),
                description: joi.string().min(3).required(),
                imageUrl: joi.string().min(6).required(),
                mapUrl: joi.string().min(6).required(),
                details: joi.string().min(6).required(),
                openingHours: joi.string().min(9).required(),
                aproved: joi.boolean().default(false),
            });

            const { error, value } = schema.validate(req.body);
            if (error) throw new Error(error.details[0].message);

            const attraction = new Attraction(value);
            const newAttraction = await attraction.save();
            res.json(newAttraction);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message || "Error adding attraction" });
        }
    },

    // Update attraction details
    updateDetails: async function (req, res, next) {
        try {
            const schema = joi.object({
                name: joi.string().min(2).max(256).required(),
                city: joi.string().min(2).max(256).required(),
                description: joi.string().min(3).required(),
                imageUrl: joi.string().min(6).required(),
                mapUrl: joi.string().min(6).required(),
                details: joi.string().min(6).required(),
                openingHours: joi.string().min(9).required(),
                aproved: joi.boolean().default(false),
            });

            const { error, value } = schema.validate(req.body);
            if (error) throw new Error(error.details[0].message);

            const updatedAttraction = await Attraction.findByIdAndUpdate(
                req.params.id,
                value,
                { new: true } // Return updated document
            );

            if (!updatedAttraction) throw new Error("No attraction found with this ID.");
            res.json(updatedAttraction);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message || "Error updating attraction" });
        }
    },

    // Delete an attraction
    deleteOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                id: joi.string().required(),
            });

            const { error, value } = schema.validate(req.params);
            if (error) throw new Error(error.details[0].message);

            const deletedAttraction = await Attraction.findByIdAndRemove(value.id);
            if (!deletedAttraction) throw new Error("Failed to delete attraction.");

            res.json(deletedAttraction);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({ error: err.message || "Error deleting attraction" });
        }
    },
};
