const Dish = require('../models/adminModels');

exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.findAll();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDishById = async (req, res) => {
  try {
    const { id } = req.body;
    const dish = await Dish.findByPk(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDish = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const newDish = await Dish.create({ name, description, price, imageUrl });
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const { id, name, description, price, imageUrl } = req.body;
    const dish = await Dish.findByPk(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    await dish.update({ name, description, price, imageUrl });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const { id } = req.body;
    const dish = await Dish.findByPk(id);
    if (!dish) {
      return res.status(404).json({ message: 'Dish not found' });
    }
    await dish.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
