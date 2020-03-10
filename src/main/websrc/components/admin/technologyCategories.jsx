import React from "react";
import ReactDOM from "react-dom";
import Header from "../header.jsx";
import NavBar from "../navbar.jsx";
import Footer from "../footer.jsx";
import "../../css/styles.css";
import "../../css/technologyCategory.css";

class TechnologyCategories extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="background">
          <img src={require("../../images/main.jpg")}></img>
        </div>

        <div className="top">
          <Header />
          <NavBar />
        </div>

        <div className="content">
          <div className="technology-category-container">
            <div className="create-category">
              <h2>New Technology Category</h2>
              <label htmlFor="category-name">Category Name: </label>
              <input id="category-name" type="text"></input>
              <button id="link-button">Create</button>
            </div>
            <div className="category-list">
              <h2>Current Categories</h2>
              <p>Categories go here</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<TechnologyCategories />, document.getElementById("app"));
