// src/controllers/user.controller.js
const User = require("../models/products");

const mongoose = require("mongoose");

const getUserController = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({ user });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = {
    getUserController
};
