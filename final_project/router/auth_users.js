const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    let userwithsamename = users.filter((user)=>{
    return user[0] === username});
    if(userwithsamename.length > 0){
        return(false)
    }
    else{
        return(true)
    }
}

const authenticatedUser = (username,password)=>{ 
    if(username && password){
        userForLogin = users.filter((user)=>{
            return user[0] === username && user[1] === password
        });
        if(userForLogin.length > 0){
            return true;
        }
        else {
            return false;
        }
    }

}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username
    const password = req.body.password
  if (!username || !password){
      return res.status(404).json({message: "Error logging in"});
  }
  if(authenticatedUser(username, password)){
      let accessToken = jwt.sign({
          data: password
      }, 'access', {expiresIn: 60 * 60});

      req.session.authorization = {
          accessToken, username
      }
      return res.status(200).send("User successfully logged in");
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
