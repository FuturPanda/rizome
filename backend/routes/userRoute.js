
const express = require('express')
const router = express.Router()
const {
  createUser,
  loginUser,
  getMe
} = require('../controllers/userController.js')




router.post("/", createUser)
router.post("/login", loginUser)
router.get("/:id", getMe)

module.exports = router