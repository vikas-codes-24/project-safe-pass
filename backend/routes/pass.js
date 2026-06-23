const express = require("express");
const { checkAuth } = require("../middleware/auth");
const {
  addPassword,
  getAllPassword,
  deletePassword,
} = require("../controller/pass");
const router = express.Router();
router.post("/", checkAuth, addPassword);
router.get("/", checkAuth, getAllPassword);
router.delete("/:id", checkAuth, deletePassword);
module.exports = router;
