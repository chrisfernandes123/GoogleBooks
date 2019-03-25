import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    inputBookName: "",
    books: [],
    booksGoogle: []
  };

  componentDidMount() {
    //this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  saveBooks = () => {
    API.saveBooks()
      .then(res => this.setState({ books: res.data }))
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
      .then(res => this.setState({ booksGoogle: res }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>(React) Google Books Search</h1>
              <h4>Search for and Save Books of Interest</h4>
            </Jumbotron>
            <form>
              <Input
                value={this.state.inputBookName}
                onChange={this.handleInputChange}
                name="inputBookName"
                placeholder="Enter Book Name"
              />

              <FormBtn onClick={this.handleBookSearchSubmit}>Search</FormBtn>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>

            {console.log(this.state.booksGoogle)}
            {console.log(this.state.booksGoogle.length)}
          </Col>
        </Row>

        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved</h1>
            </Jumbotron>
            {this.state.booksGoogle.length ? (
              <List>
                {this.state.booksGoogle.data.map(book => (
                  <ListItem key={book.id}>
                    <a href={"/books/" + book.id}>
                      <strong>
                        {book.title} by {book.description}
                      </strong>
                    </a>
                    <DeleteBtn />
                    {console.log(book)}
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>

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
