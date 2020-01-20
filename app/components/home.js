import React from "react";
import Graph from "./graph";

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
      xAxisLabel: "a"
    };
  }

  render() {
    let xAxisLabel = this.state.xAxisLabel;
    let sortedData = [...this.state.data].sort((a, b) => a[xAxisLabel] - b[xAxisLabel]);
    return (
      <div id="container">
        <div className={this.state.dataVisualsView}>
          <Graph sortedData={sortedData} xAxisLabel={xAxisLabel} />
        </div>
      </div>
    );
  }
}
