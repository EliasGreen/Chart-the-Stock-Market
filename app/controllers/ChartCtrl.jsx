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
    add_user: function(place, user) {
      dispatch(actions.add_user(place, user))
    },
    delete_user: function(place, user) {
      dispatch(actions.delete_user(place, user))
    }
  }
}

const ChartCtrl = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chart);

module.exports = ChartCtrl;