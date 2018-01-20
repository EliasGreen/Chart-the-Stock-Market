const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Stocks');
/**************************************/
const AddStockBlock = require('./AddStockBlock');
const Stock = require('./Stock');

/* the Stocks component for concatenating AddStokeBlock and list of Stocks */
class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="stocks_div">
          <AddStockBlock />
          <div className="stock_list">
            <Stock />
          </div>
        </div>
      );
    }
};

module.exports = Stocks;