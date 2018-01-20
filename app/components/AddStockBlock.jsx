const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/AddStockBlock');

/* the AddStockBlock component with Add Stock Button for managing adding stocks  */
class AddStockBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div className="AddStockBlock_div">
          <button>AddStockBlock</button>
        </div>
      );
    }
};

module.exports = AddStockBlock;