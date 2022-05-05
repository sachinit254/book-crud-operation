const { Book } = require("../model/bookModel");
const { getPostData } = require("../utils");

// @desc     Get all books
// @route    GET /books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (error) {
    console.log(error);
  }
};

// @desc     Get book by id
// @route    GET /books/:id
const getBookById = async (req, res, id) => {
  try {
    const book = await Book.findById(id);
    if (book) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(book));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not found" }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc     create book
// @route    POST /books
const createBook = async (req, res) => {
  try {
    const body = await getPostData(req);
    const { title, author, pic, from, by, phoneNumber } = JSON.parse(body);
    if (!title || !author || !pic || !from || !by) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Please fill all the fields" }));
      return;
    } else {
      const book = new Book({
        title,
        author,
        pic,
        by,
        from,
        phoneNumber,
      });
      const createdBook = await book.save();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: createdBook }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc     update book
// @route    PUT /books/:id
const updateBook = async (req, res, id) => {
  try {
    const body = await getPostData(req);
    const { title, author, pic, from, by, phoneNumber } = JSON.parse(body);
    const book = await Book.findById(id);
    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.pic = pic || book.pic;
      book.by = by || book.by;
      book.from = from || book.from;
      book.phoneNumber = phoneNumber || book.phoneNumber;
      const updatedBook = await book.save();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ updatedBook }));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.string({ message: "Book not found" }));
    }
  } catch (err) {
    console.log(err);
  }
};

// @desc     delete book
// @route    DELETE /books
const deleteBook = async (req, res, id) => {
  try {
    const book = await Book.findById(id);
    if (book) {
      await book.remove();
      const books = await Book.find();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ data: books }));
    } else { 
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Book not found" }));
    }
  } catch (err) {}
};

module.exports = { getBooks, getBookById, createBook, updateBook, deleteBook };
