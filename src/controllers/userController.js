const User = require('../models/User')

const getUsers = async (req, res) => {
  const users = await User.find()
  // console.log(users)
  res.json(users)
}

const createUser = async (req, res) => {
  const { userName, password, email, phote, connection } = req.body
  try {
    const newUser = await User.create({ userName, password, email, phote, connection })
    console.log(newUser)

    res.json(newUser)
  } catch (error) {
    console.error(error)
  }
}
const updateUser = async (req, res) => {
  const { _id, userName, password, email, phote, connection } = req.body
  console.log(_id, userName, password, email, phote, connection)
  try {
    await User.findByIdAndUpdate(_id, { userName, password, email, phote, connection })
    res.json({ message: 'Personal Info updated' })
  } catch (error) {
    console.error(error)
  }
}
const getUser = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName, password });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      return res.json({ message: 'Usuario encontrado', user });

    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { getUsers, createUser, updateUser, getUser }