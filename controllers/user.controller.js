const BaseController = require('./base.controller');
const User = require('../models/user.model');

class UserController extends BaseController {
  constructor() {
    super(User);
  }

  getCurrent = async (req, res) => {
    try {
      const userId = req.userData.id;
      const user = await User.findById(userId).select(
        'name last_name email elo license_number'
      );
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateProfile = async (req, res) => {
    try {
      const userId = req.userData.id;
      const updates = req.body;
      const allowedUpdates = [
        'name',
        'last_name',
        'elo',
        'is_admin',
        'license_number',
      ];
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        Object.keys(updates).reduce((obj, key) => {
          if (allowedUpdates.includes(key)) {
            obj[key] = updates[key];
          }
          return obj;
        }, {}),
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = new UserController();
