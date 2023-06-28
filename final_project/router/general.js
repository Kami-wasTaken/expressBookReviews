const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



const getbooks = new Promise((res,rej)=>{

})

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
  
});

// Get the book list available in the shop

public_users.get('/',function (req, res) {
    const getbooks = new Promise((resolve,reject)=>{
        resolve(books)
    })

    getbooks.then(books=>{
        return res.status(300).json({message: books});
    }).catch(error => {
        res.status(500).json({ error: 'An error occurred.' });
    })
    
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const getbooks = new Promise((resolve, reject)=>{
        const isbn = req.params.isbn
        const err = "isbn not provided"
        if(isbn){
            book = books[isbn]
            resolve(book)
            
        }
        else{
            reject(err)
        }
    })

    getbooks.then(
        (books) => {
            return res.status(300).json({message: book});
        },
        (err) => {
            return res.status(422).json({message: err});
        }
    )
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const getbooks = new Promise((resolve, reject)=>{
        let bookswithAuthor = []
        err = "Invalid Author"
        if(req.params.author){
            for( let i = 1; i < Object.keys(books).length ; i++){
                if(books[i]["author"] === req.params.author){
                    bookswithAuthor.push(books[i])
                }
            }
            resolve(bookswithAuthor)
        }
        else{
            reject(err)
        }
    })

    getbooks.then((bookswithAuthor)=>{
        return res.status(300).json({message: bookswithAuthor});
    },
    (err)=>{
        return res.status(422).json({message: err});
    })
    
  });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const getbook = new Promise((resolve, reject)=>{
    let err = "invalid title"
    let bookswithtitle = []
    if(req.params.title){
        for( let i = 1; i < Object.keys(books).length ; i++){
            if(books[i]["title"] === req.params.title){
                bookswithtitle.push(books[i])
            }
        }
        resolve(bookswithtitle)
        
    }
    else{
        reject(err)
    }

  })

  getbook.then(
    (bookswithtitle)=>{
        return res.status(300).json({message: bookswithtitle});
    },
    (err)=>{
        return res.status(422).json({message: err});
    })

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
