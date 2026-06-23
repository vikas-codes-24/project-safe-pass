const { pass } = require("../Models/pass");

async function addPassword(req, res) {
  const { siteUrl, username, password } = req.body;

  const savePassword = await pass.create({
    siteUrl,
    username,
    password,
    userId: req.user.userId,
  });
  res.json(savePassword);
}

async function getAllPassword(req, res) {
  const Password = await pass.find({
    userId: req.user.userId,
  });
  return res.json(Password);
}

async function deletePassword(req, res) {
  const { id } = req.params;
  await pass.findByIdAndDelete({
    _id: req.params.id,
    userId: req.user.userId,
  });
  return res.json({ message: "deleted!!!" });
}
module.exports = { addPassword, getAllPassword, deletePassword };
