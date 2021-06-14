const Artists = require('../models/Artists.model');

const artistsGet = async (req, res) => {
  try {
    const artists = await Artists.find();
    res.json(artists);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const artistGetById = async (req, res) => {
  try {
    const id = req.params.id;    
    const artist = await Artists.findById(id);    
    res.json(artist);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { artistsGet, artistGetById };
