const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let username = req.body.username
    let password = req.body.password
    if(username && password){
      if(isValid(username)){
          users.push([username, password])
          res.send("successfully registered")
      }
      else{
          res.send("usename already exists")
      }
      
  }
  res.send("username or password not provided")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4))
  return res.status(300).json({message: "Rerieved Books"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn
  if(isbn){
      res.send(books[isbn])
      return res.status(300).json({message: "Rerieved Books"});
  }
  else{
      res.send("ISBN provided is invalid")
      return res.status(422).json({message: "Invalid ISBN"});
  }
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let bookswithAuthor = []
    if(req.params.author){
        for( let i = 1; i < Object.keys(books).length ; i++){
            if(books[i]["author"] === req.params.author){
                bookswithAuthor.push(books[i])
            }
        }
        res.send(bookswithAuthor)
        return res.status(300).json({message: "Retrieved Books"});
    }
    else{
        res.send("Invalid Author Provided")
        return res.status(422).json({message: "Invalid Author"});
    }
    
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let bookswithtitle = []
  if(req.params.title){
      for( let i = 1; i < Object.keys(books).length ; i++){
          if(books[i]["title"] === req.params.title){
              bookswithtitle.push(books[i])
          }
      }
      res.send(bookswithtitle)
      return res.status(300).json({message: "Retrieved Books"});
  }
  else{
      res.send("Invalid Title Provided")
      return res.status(422).json({message: "Invalid Title"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    if(req.params.isbn){
        res.send(books[req.params.isbn]["reviews"])
        return res.status(300).json({message: "Retrieved Reviews"});
    }
    else{
        res.send("Invalid ISBN")
        return res.status(422).json({message: "Invalid ISBN"});
    }
  
});

module.exports.general = public_users;
