/* actions */

module.exports = {
 
  ADD_STOCK: 'ADD_STOCK',
  
  DELETE_STOCK: 'DELETE_STOCK',

  add_stock: function(stock) {
    return {
      type: this.ADD_STOCK,
      stock
    }
  },

  delete_stock: function(stock) {
    return {
      type: this.DELETE_STOCK,
      stock
    }
  }
  
}
