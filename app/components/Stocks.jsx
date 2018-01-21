const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Stocks');
/**************************************/
const AddStockBlockCtrl = require('../controllers/AddStockBlockCtrl');
const Stock = require('./Stock');

/* the Stocks component for concatenating AddStokeBlock and list of Stocks */
class Stocks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.props.state
    };
  }
  /**************************************/
  componentWillReceiveProps(nextprops) {
    this.setState({
          ["stocks"]: nextprops.state
           });
  }
  /**************************************/
  render() {
      let itrArray = Object.values(this.state.stocks);
      let stock_list = itrArray.map((e) => <Stock key={e.stock} symbol={e.stock}/>);
      return (
        <div className="stocks_div">
          <AddStockBlockCtrl />
          <div className="stock_list">
            {stock_list}
          </div>
        </div>
      );
    }
};

module.exports = Stocks;