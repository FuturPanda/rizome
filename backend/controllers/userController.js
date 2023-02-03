const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const faunadb = require("faunadb")
const client = new faunadb.Client({secret : process.env.FAUNA_URI })
const q = faunadb.query


// @desc    Registrer User
// @path    POST /api/users
// @access  public
const createUser  =  async (req, res) => {
  const {name, email, password} = req.body 
  if(!name || !email || !password){
    res.status(404).json("Invalid fields, please enter all fields. ")
  }
  //Check if user exists. 
  const userExists = await client.query(
    q.Exists(
      q.Match(  
        "usersByEmail", 
        email)
      )
    )
  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  if(!userExists) {
    const newUser = await client.query( 
      q.Create(
        q.Collection("users"), {
          data : {
            name : name,
            email : email,
            password : hashedPassword
          }
        }    
      )
    ) .then(result => res.json({result})) 
    .catch(error => console.error(error))
  }
  else{
    res.json({
      message : "user already exists",
      
    })
  }
}


// @desc    Login User
// @path    POST /api/users/login
// @access  public
const loginUser  =  async (req, res) => {
  const {email, password} = req.body

  const user = await client.query(
    q.Exists(
      q.Match("usersByEmail", email)
    )
  )
  const userPW = await client.query(
    q.Select(
      ["data", "password"], 
      q.Get(
        q.Match(
          q.Index("usersByEmail"), 
          email
        )
      )
    )
  )
  if (user && (await bcrypt.compare(password, userPW))){
    res.json({
      email : email, 
      name : 'My name is haha'
    })
  }
  else{
    res.json({message : "Password incorrect"})
  }

  
}

// @desc    Get User data
// @path    Get /api/users/me
// @access  public
const getMe  =  (req, res) => {
  res.json({message : "get user Me"})
}



//Generate JWT 

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn : "30d"
  })
}

//Get object of user 
const getUserObj = (email) => {
  const 
}
  
module.exports = {
  createUser, 
  loginUser,
  getMe
}