import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import SaveBtn from "../components/SaveBtn";
import ViewBtn from "../components/ViewBtn";
import Card from "../components/Card";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    inputBookName: "",
    books: [],
    booksGoogle: [],
    viewState: ""
  };

  componentDidMount() {
    this.setState({
      viewState: "Search"
    });
    //this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log("in loadBooks API.getBooks res is ", res);
        this.setState({ books: res.data });
      })
      .catch(err => console.log(err));
  };

  saveBook = book => {
    console.log("saveBook");
    console.log("Book is: ", book);
    let bookData = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.smallThumbnail,
      link: book.volumeInfo.infoLink
    };

    console.log("Book data: ", bookData);

    API.saveBook(bookData)
      .then(res => {
        this.setState({ books: res.data });

        alert("Your book has been saved");
      })
      .catch(err => console.log(err));
  };

  deleteBook = bookID => {
    API.deleteBookByID(bookID)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleBookSearchSubmit = event => {
    event.preventDefault();
    console.log(this.state.inputBookName);

    API.getGoogleBooksByBookName(this.state.inputBookName)
      .then(res => this.setState({ booksGoogle: res.data }))
      .catch(err => console.log(err));
  };

  clickSearch = event => {
    this.setState({ viewState: "Search" });
  };

  clickViewSaved = event => {
    this.setState({ viewState: "ViewSaved" });
    this.loadBooks();
  };

  render() {
    return (
      <Container fluid>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <a className="navbar-brand" href="/">
            Google Books
          </a>

          <ul className="nav">
            <li>
              <button
                className="nav-item m-2"
                onClick={() => this.clickSearch()}
              >
                Search Books
              </button>
            </li>
            <li>
              <button
                className="nav-item m-2"
                onClick={() => this.clickViewSaved()}
              >
                View Saved Books
              </button>
            </li>
          </ul>
        </nav>

        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h4>Search for and Save Books of Interest</h4>
            </Jumbotron>
          </Col>
        </Row>

        {this.state.viewState === "Search" ? (
          <div>
            <Row>
              <Col size="md-12">
                <form>
                  <Input
                    value={this.state.inputBookName}
                    onChange={this.handleInputChange}
                    name="inputBookName"
                    placeholder="Enter Book Name"
                  />

                  <FormBtn onClick={this.handleBookSearchSubmit}>
                    Search
                  </FormBtn>
                </form>
              </Col>
            </Row>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>Search Results</h1>
                </Jumbotron>
                {this.state.booksGoogle.length ? (
                  this.state.booksGoogle.map(book => (
                    <Card key={book.id}>
                      <SaveBtn onClick={() => this.saveBook(book)} />
                      <ViewBtn
                        onClick={() =>
                          window.open(
                            book.volumeInfo.previewLink,
                            "_blank",
                            "location=yes,height=570,width=520,scrollbars=yes,status=yes"
                          )
                        }
                      />
                      <img src={book.volumeInfo.imageLinks.smallThumbnail} />
                      <br />
                      <strong>{book.volumeInfo.title} </strong> <br />
                      <br />
                      <strong>Written by: </strong>
                      {book.volumeInfo.authors.map(author => author + " ")}
                      <br />
                      <br />
                      <strong>Description: </strong>
                      <br />
                      <br />
                      {book.volumeInfo.description}
                      <a href={"/books/" + book.volumeInfo.id} />
                      {console.log(book)}
                    </Card>
                  ))
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>Saved Books Results</h1>
                </Jumbotron>
                {this.state.books.length ? (
                  this.state.books.map(book => (
                    <Card key={book._id}>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                      <ViewBtn
                        onClick={() =>
                          window.open(
                            book.link,
                            "_blank",
                            "location=yes,height=570,width=520,scrollbars=yes,status=yes"
                          )
                        }
                      />
                      <img src={book.image} />
                      <br />
                      <strong>{book.title} </strong> <br /> <br />
                      <strong>Written by: </strong>{" "}
                      {book.authors.map(author => author + " ")}
                      <br />
                      <br />
                      <strong>Description:</strong>
                      <br />
                      {book.description}
                      <a href={"/books/" + book._id} />
                      {console.log(book)}
                    </Card>
                  ))
                ) : (
                  <h3>No Results to Display</h3>
                )}
              </Col>
            </Row>
          </div>
        )}

        {/* <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.description}
                      </strong>
                    </a>
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row> */}
      </Container>
    );
  }
}

export default Books;
