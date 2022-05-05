const http = require("http");
const { connectDB } = require("./config/db");
require("dotenv").config();
connectDB();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("./controllers/controllers");
const port = process.env.PORT || 1337;
const server = http.createServer(async (req, res) => {
  if (req.url === "/books" && req.method === "GET") {
    getBooks(req, res);
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[2];
    getBookById(req, res, id);
  } else if (req.url === "/books" && req.method === "POST") {
    createBook(req, res);
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === "PUT") {
    const id = req.url.split("/")[2];
    updateBook(req, res, id);
  } else if (req.url.match(/\/books\/([0-9]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    deleteBook(req, res, id);
  }
});

server.listen(port, () => {
  console.log(`server started running on port ${port}`);
});
