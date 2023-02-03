const asyncHandler = require('express-async-handler')
const faunadb = require("faunadb")
const client = new faunadb.Client({secret : "fnAE70PCP3AA1tlQ7vHwJyW2qmOsrKfHszLEZ5DT"})
const q = faunadb.query

// @desc  Get all ideas from db
// @path    GET api/ideas
// @access  private
const getIdeas = async(req, res) => {
  const ideasAll = await client.query(
    q.Paginate(
      q.Match(
      q.Index('ideasAll')
    ))
  ).then(index => res.json(index))
  .catch(err => console.log(error))
}

// @desc  create a new idea
// @path    POST api/idea
// @access  private
const setIdeas = asyncHandler(async (req, res) => {
  console.log(req.body.text)
  const newIdea = await client.query(
    q.Create(
      q.Collection("ideas"), 
      {data : {title : req.body.text}}
    )
  ).then(response => res.json(response))
  

 
})

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