import React from "react";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { a: 1, b: 3, c: 10 },
        { a: 3, b: 20, c: 12 },
        { a: -1, b: -5, c: -4 },
        { a: 2, b: -3, c: 7 }
      ]
    };
  }

  render() {
    return (
      <div id="container">
      </div>
    );
  }
}
