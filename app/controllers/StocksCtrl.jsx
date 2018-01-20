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
    add_user: function(place, user) {
      dispatch(actions.add_user(place, user))
    },
    delete_user: function(place, user) {
      dispatch(actions.delete_user(place, user))
    }
  }
}

const StocksCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stocks);

module.exports = StocksCtrl;