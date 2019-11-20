import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <img src={require("../images/ford_badge.png")}></img>
        <img src={require("../images/IDTE.png")}></img>
      </div>
    );
  }
}

export default Header;
