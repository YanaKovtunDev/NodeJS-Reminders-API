const Reminders = require('../models/reminders');
const {Op} = require('sequelize');


const createReminder = async(req, res) => {
    const reminder = req.body;
    try {
        const response = await Reminders.create(reminder);
        if(!response) {
           return res.status(500).json({message: "Internal server error"})
        }
       return res.status(201).json(response)
    } catch (error) {
        return res.status(400).json({message: "Error with creating reminder: ", error})
    }
}

const getAllReminders = async(req, res) => {
    const {user, after} = req.query;
    const conditions = {}
    try {
        if(user) {
            conditions.user = user
        }
        if(after) {
            conditions.date = {
                [Op.gte]: new Date(parseInt(after, 10))
            }
        }
        const reminders = await Reminders.findAll({
            where: conditions
        })
        return res.status(200).json(reminders)
    } catch (error) {
        return res.status(404).json({message: "Error with getting all reminders: ", error})
    }
}

const getReminderById = async(req, res) => {
    const id = req.params.id;
    try {
        const reminder = await Reminders.findByPk(id)
        if(!reminder) {
            res.status(404).send("ID not found")
        }
        return res.status(200).json(reminder)
    } catch (error) {
        return res.status(404).json({message: "Error with getting reminder by id: ", error})
    }
}

const changeReminder = async (req, res) => {
    try {
        return res.status(405).json({ message: 'Method Not Allowed' });
    } catch (error) {
        return res.status(404).json({ message: "Error with changing reminder: ", error });
    }
};


module.exports = {
 createReminder, getAllReminders, getReminderById, changeReminder
}
