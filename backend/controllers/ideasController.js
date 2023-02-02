

// @desc  Get all ideas from db
// @path    GET api/ideas
// @access  private
const getIdeas = (req, res) => {
  res.json({message : "Get Idea"})
}

// @desc  create a new idea
// @path    POST api/idea
// @access  private
const setIdeas = (req, res) => {
  res.json({message : "Set Idea"})
}

// @desc    update an idea
// @path    PUT api/idea/:id
// @access    private
const changeIdeas = (req, res) => {
  res.json({message : "Update Idea"})
}

// @desc      delete an idea
// @path      DELETE api/:id
// @access    private
const deleteIdeas = (req, res) => {
  res.json({message : "Delete Idea"})
}

module.exports = {
  getIdeas, 
  setIdeas, 
  changeIdeas, 
  deleteIdeas
}