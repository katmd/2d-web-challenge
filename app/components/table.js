import React from "react";

export default class Table extends React.Component {
  constructor(props) {
    super();
    this.props = props;
    this.getTableHeader = this.getTableHeader.bind(this);
    this.getTableData = this.getTableData.bind(this);
  }

  getTableHeader() {
    let header = Object.keys(this.props.sortedData[0]);
    return header.map((key, idx) => {
      return <th key={idx}>{key}</th>;
    });
  }

  getTableData() {
    return this.props.sortedData.map((dataRow, idx) => {
      // file sorted data into table elements
      let rowData = [];
      for (let key of Object.keys(dataRow)) {
        rowData.push(dataRow[key])
      }
      return (
        <tr key={idx}>
          {rowData.map((dataPoint, dpIdx) => {
            return <td key={dpIdx}>{dataPoint}</td>
          })}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="table-container">
        <div id="table-title">Holocene DataSet</div>
        <table id="table">
          <tbody>
            <tr>{this.getTableHeader()}</tr>
            {this.getTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}
