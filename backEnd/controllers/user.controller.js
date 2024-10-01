const User = require("../models/User");

const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    console.log(userWithoutPassword);
    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const updUser = await User.findOne({ _id: user._id });
    const userUpdWithoutPassword = updUser.toObject();
    delete userUpdWithoutPassword.password;
    res.status(200).json({ success: true, userUpdWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserById, editUser, deleteUser };
