const { connect } = require('react-redux');
const actions = require('../actions');
const Stocks = require('../components/Stocks');
/**************************************************/
/**************************************************/
/*                Stocks Controller               */
/**************************************************/
/**************************************************/
const mapStateToProps = function(state) {
  return {
    state
  };
}

const mapDispatchToProps = function(dispatch) {
  return {
    add_stock: function(stock) {
      dispatch(actions.add_stock(stock))
    },
    delete_stock: function(stock) {
      dispatch(actions.delete_stock(stock))
    }
  }
}

const StocksCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks);

module.exports = StocksCtrl;