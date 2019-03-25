// Defining methods for the booksController
const axios = require("axios");

module.exports = {
  findByBookName: function(req, res) {
    // https://www.googleapis.com/books/v1/volumes?q=flowers&key=AIzaSyAP0uxAuZyZtZVvvSDe9rmM3gAkmI9vKBI

    console.log("req.params.bookName");
    console.log(req.params.bookName);
    axios({
      method: "get",
      url:
        "https://www.googleapis.com/books/v1/volumes?q=" +
        req.params.bookName +
        "&key=AIzaSyAP0uxAuZyZtZVvvSDe9rmM3gAkmI9vKBI"
    })
      // .then(function(response) {
      //   console.log(response);
      // })

      //console.log(response.data.items.volumeInfo)
      // .then(response => res)

      .then(function(response) {
        // res = response.data;
        // console.log(res);
        res.send(response.data.items);
      })

      .catch(function(error) {
        console.log(error);
      });
  }
};
