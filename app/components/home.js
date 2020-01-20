import React from "react";
import Table from "./table"
import Graph from "./graph";
import UserInput from "./user-input"

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        { a: 1, b: 3, c: 10 },
        { a: 3, b: 20, c: 12 },
        { a: -1, b: -5, c: -4 },
        { a: 2, b: -3, c: 7 }
      ],
      xAxisLabel: "a",
      dataVisualsView: "data-visuals-row"
    };
    this.addUserInput = this.addUserInput.bind(this);
  }

  addUserInput(input) {
    this.setState(prevState => {
      return { data: [...prevState.data, input] };
    });
  }

  render() {
    let xAxisLabel = this.state.xAxisLabel;
    let sortedData = [...this.state.data].sort((a, b) => a[xAxisLabel] - b[xAxisLabel]);
    return (
      <div id="container">
        <div className={this.state.dataVisualsView}>
          <Table sortedData={sortedData} xAxisLabel={xAxisLabel} />
          <Graph sortedData={sortedData} xAxisLabel={xAxisLabel} />
        </div>
        <div className="submissions-row">
          <UserInput sortedData={sortedData} addUserInput={this.addUserInput} />
          <div id="empty-submission-space" />
        </div>
      </div>
    );
  }
}
