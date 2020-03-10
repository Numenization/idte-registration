import React from "react";
import ReactDOM from "react-dom";
import Header from "../header.jsx";
import NavBar from "../navbar.jsx";
import Footer from "../footer.jsx";
import "../../css/styles.css";
import "../../css/technologyCategory.css";
import Technology from "../../data/technologies.js";

class TechnologyCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      error: null
    };

    this.getCategories = this.getCategories.bind(this);
  }

  async getCategories() {
    this.setState({ loading: true });

    var categories = await Technology.getCategories();

    if (categories.statusText) {
      this.setState({ error: categories.statusText, loading: false });
      return;
    }

    this.setState({ categories: categories, loading: false });
  }

  async componentDidMount() {
    this.getCategories();
  }

  render() {
    const categories = this.state.categories;
    const removeButtonStyles = {};

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
              <button
                id="link-button"
                onClick={async e => {
                  const category = document.getElementById("category-name")
                    .value;
                  document.getElementById("category-name").value = "";
                  await Technology.postCategory(category);
                  await this.getCategories();
                }}
              >
                Create
              </button>
            </div>

            <div className="category-list">
              <h2>Current Categories</h2>
              {categories.map((category, i) => {
                return (
                  <div key={i} id={category.id} className="category-row">
                    <label>{category.category}</label>
                    <button
                      id="link-button"
                      style={removeButtonStyles}
                      onClick={async e => {
                        await Technology.deleteCategory({
                          id: parseInt(e.target.parentNode.id)
                        });
                        await this.getCategories();
                      }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
ReactDOM.render(<TechnologyCategories />, document.getElementById("app"));
