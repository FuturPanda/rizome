const express = require('express')
const router = express.Router()
const {
  getIdeas, 
  setIdeas, 
  changeIdeas,
  deleteIdeas
} = require('../controllers/ideasController.js')

router.get("/", getIdeas)
router.post("/", setIdeas)
router.put("/:id", changeIdeas)
router.delete("/:id", deleteIdeas)

module.exports = router