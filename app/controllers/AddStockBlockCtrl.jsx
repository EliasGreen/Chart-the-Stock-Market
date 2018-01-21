const { connect } = require('react-redux');
const actions = require('../actions');
const AddStockBlock = require('../components/AddStockBlock');
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

const AddStockBlockCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStockBlock);

module.exports = AddStockBlockCtrl;