/* reducers */

const { ADD_STOCK, DELETE_STOCK } = require('./actions');

function votes(state = [], action) {
  switch (action.type) {
    case ADD_STOCK:
        state =  Object.values(state);
        state.push({stock: action.stock});
      return Object.assign({}, state);
    case DELETE_STOCK:
        for(let i = 0; i < state.length; i++) {
          if(state[i]["stock"] == action.stock) {
            state.splice(i, 1);
              return Object.assign({}, state);
          }
        }   
    default:
      return state;
  }
}

module.exports = votes