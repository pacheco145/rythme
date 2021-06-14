const mongoose = require('mongoose');
const Artists = require('../models/Artists.model')

const stylesGet = async (req, res) => {
    try {
        const styles = await Artists.distinct("styles")
        res.json(styles)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {stylesGet}