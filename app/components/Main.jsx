const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Main');
/**************************************/
const ChartCtrl = require('../controllers/ChartCtrl');
const StocksCtrl = require('../controllers/StocksCtrl');

/* the Main component for the index route of this app */
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
      return (
        <div>
          <ChartCtrl/>
          <StocksCtrl/>
        </div>
      );
  }
};

module.exports = Main;