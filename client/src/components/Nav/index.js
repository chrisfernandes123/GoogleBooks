import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    //console.log(this.state.user);

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          Google Books
        </a>

        <ul className="nav">
          <li className="nav-item m-2">aaa</li>
          <li className="nav-item m-2">bbb</li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
