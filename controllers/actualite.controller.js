const Actualite = require('../models/actualite.model');

exports.create = async (req, res) => {
  try {
    const actualite = new Actualite(req.body);
    await actualite.save();
    res.status(201).json(actualite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const actualites = await Actualite.find();
    res.json(actualites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const actualite = await Actualite.findById(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.json(actualite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.json(actualite);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndDelete(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.json({ message: 'Actualité supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
