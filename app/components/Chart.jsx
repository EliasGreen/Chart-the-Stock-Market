const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Chart');

/* the Chart component for render Chart from stocks */
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="chart_div">
          <h1>Chart</h1>
        </div>
      );
    }
};

module.exports = Chart;