const db = require("../Models/index");
const Users = db.user;

//getAll user
function getAllUser(req, res) {
  Users.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//get single user by Id
function getOneUser(req, res) {
  Users.findByPk(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//update user
function updateUser(req, res) {
  const newObj = {
    Name: req.body.Name,
    Email: req.body.Email,
  };
  Users.update(newObj, { where: { Email: req.body.Email } })
    .then(() => {
      res.send("Updated data successfully" + req.body.Email);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

//delete user
async function deleteUser(req, res) {
  try {
    const getData = await Users.findAll({ where: { id: req.params.id } });
    if (getData && getData.length) {
      Users.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Deleted user successfully" });
    } else {
      res.status(400).json({ message: "user doesn't exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
};
