import React, { Component } from "react";
import Chart from "chart.js";
let graph;

export default class Graph extends Component {
  constructor(props) {
    super();
    this.state = {
      chartType: "line",
      datasets: []
    };
    this.createChart = this.createChart.bind(this);
    this.selectChartType = this.selectChartType.bind(this);
    this.getChartColors = this.getChartColors.bind(this);
    this.getChartData = this.getChartData.bind(this);
    this.props = props;
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    this.createChart();
  }

  selectChartType(type) {
    this.setState({ chartType: type });
  }

  getChartColors() {
    let letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getChartData() {
    // bring in data from props
    let sortedData = this.props.sortedData;
    let xAxisLabel = this.props.xAxisLabel;

    // format sorted data into graph components
    let graphxAxis = [];
    let graphData = {};
    sortedData.forEach(element => {
      for (let key of Object.keys(element)) {
        if (key !== xAxisLabel && graphData[key]) {
          graphData[key].push(element[key]);
        } else if (key !== xAxisLabel && !graphData[key]) {
          graphData[key] = [element[key]];
        } else {
          graphxAxis.push(element[key]);
        }
      }
    });
    let keyIdxCounter = 0;
    let graphDatasets = [];
    for (let key of Object.keys(graphData)) {
      let color = this.getChartColors();
      graphDatasets.push({
        label: key,
        data: graphData[key],
        fill: false,
        borderColor: color,
        backgroundColor: color
      });
      if (
        this.state.datasets.length === 0 ||
        graphDatasets[keyIdxCounter].data.length !==
          this.state.datasets[keyIdxCounter].data.length
      ) {
        // retain color if data already exists
        if (this.state.datasets[keyIdxCounter]) {
          graphDatasets[keyIdxCounter].borderColor = this.state.datasets[
            keyIdxCounter
          ].borderColor;
          graphDatasets[keyIdxCounter].backgroundColor = this.state.datasets[
            keyIdxCounter
          ].backgroundColor;
        }
        this.setState({ datasets: graphDatasets });
      }
      keyIdxCounter++;
    }

    return { graphxAxis: graphxAxis, graphDatasets: this.state.datasets };
  }

  createChart() {
    let chartData = this.getChartData();

    // check if graph exists to trigger update of data
    if (typeof graph !== "undefined") {
      graph.destroy();
    }

    // create graph with chartData
    const ctx = document.getElementById("graph").getContext("2d");
    graph = new Chart(ctx, {
      type: this.state.chartType,
      data: {
        //Bring in data
        labels: chartData.graphxAxis,
        datasets: chartData.graphDatasets
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: "Holocene DataSet",
          fontSize: 16
        },
        legend: {
          position: "right"
        },
        elements: {
          line: {
            tension: 0 // disables bezier curves
          }
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.props.xAxisLabel
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Data Points"
              }
            }
          ]
        }
      }
    });
  }

  render() {
    return (
      <div className="graph-container">
        <div className="graph-options">
          <button type="submit" onClick={() => this.selectChartType("line")}>
            LINE
          </button>
          <button type="submit" onClick={() => this.selectChartType("bar")}>
            BAR
          </button>
        </div>
        <div id="graph-body">
          <canvas id="graph" />
        </div>
      </div>
    );
  }
}
