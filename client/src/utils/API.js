import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBooksByID: function(id) {
    return axios.get("/api/books/" + id);
  },

  getGoogleBooksByBookName: function(bookName) {
    return axios.get("/api/booksGoogle/" + bookName);
  },

  // Deletes the book with the given id
  deleteBookByID: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    console.log("inside saveBook");
    return axios.post("/api/books", bookData);
  }
};
