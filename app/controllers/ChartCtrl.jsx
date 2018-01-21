const { connect } = require('react-redux');
const actions = require('../actions');
const Chart = require('../components/Chart');
/**************************************************/
/**************************************************/
/*               Chart Controller                 */
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

const ChartCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);

module.exports = ChartCtrl;