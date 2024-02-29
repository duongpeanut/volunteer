const User = require("../models/User");
const Volunteer = require("../models/Volunteer");

const jwt = require('jsonwebtoken');


const userController = {

    getUserInfor: async (req, res) => {

        try {
            const user = await User.findById(req.params.userId).select('-password');
            res.status(200).json({
                success: false,
                user: user
            });

        }
        catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find().select('-password');
            res.status(200).json(user);
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    updateUser: async (req, res) => {
        try {
            const user = req.body
            console.log(req.params)
            await User.findOneAndUpdate({ _id: user._id }, user)
            return res.status(200).json("Update success");

        }
        catch (error) {
            console.log('error', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // cho Org
    updateUserRole: async (req, res) => {
        try {
            const { role } = req.body

            await User.findOneAndUpdate({ _id: req.params.userId }, {
                role
            })

            res.json({ msg: "Update Success!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    // Ban a user
    banUser: async (req, res) => {
        try {
            // await User.findByIdAndDelete(req.params.id);
            await User.findByIdAndUpdate(req.params.userId, {
                isActive: false,
            }, { new: true });
            res.status(200).json("User was ban");
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.userId);
            res.status(200).json("User was deleted");
        } catch (error) {
            console.log('error', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },
};

module.exports = userController;