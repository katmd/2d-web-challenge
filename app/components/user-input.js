import React from "react";

export default class UserInput extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.props = props;
    this.getDataKeys = this.getDataKeys.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getDataKeys();
  }

  getDataKeys() {
    // get all possible data types (a, b, c, etc.) so user may submit custom data points
    let sortedData = this.props.sortedData;
    let dataKeys = Object.keys(sortedData[0]);
    dataKeys.forEach(key => {
      this.setState({ [key]: "" });
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // add new data points to state as integers
    this.setState(prevState => {
      for (let key of Object.keys(prevState)) {
        prevState[key] = parseInt(prevState[key]);
      }
      return prevState;
    });
    this.props.addUserInput(this.state);
    this.setState({ a: "", b: "", c: "" });
  }

  render() {
    let inputBoxes = Object.keys(this.state);
    return (
      <div id="input-box-container">
        <h3 id="form-title">Submit Data</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="input-rows">
            {inputBoxes.map((box, idx) => (
              <div className="input-box-row" key={idx}>
                <label htmlFor={box}>{box}: </label>
                <input
                  type="text"
                  name={box}
                  value={this.state[box]}
                  onChange={this.handleChange}
                  required={true}
                />
                {this.state[box].length > 0 &&
                  isNaN(parseInt(this.state[box])) && (
                    <p className="input-error">Not a number</p>
                  )}
              </div>
            ))}
          </div>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
