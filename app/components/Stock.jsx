const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Stock');

/* the Stock component for render "stock card" */
class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="stock_div">
          <h1>Stock</h1>
        </div>
      );
    }
};

module.exports = Stock;