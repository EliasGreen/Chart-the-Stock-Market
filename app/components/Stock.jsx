const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Stock');
// socket.io
const io = require('socket.io-client');

/* the Stock component for render "stock card" */
class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: this.props.symbol
    };
    this.handleDeleteStock = this.handleDeleteStock.bind(this);
  }
  handleDeleteStock() {
    /********/
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/delete-stock', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      
      
      let body = 'stock=' + encodeURIComponent(this.state.stock);


      xhr.send(body);

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
          alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
          return;
        }
        let response = JSON.parse(this.responseText);
                const socket = io.connect();
                socket.emit('delete', that.state.stock);
        }
  }
  render() {
      return (
        <div className="stock_div">
          <div className="stock">{this.props.symbol}<span onClick={this.handleDeleteStock}>&#9747;</span></div>
        </div>
      );
    }
};

module.exports = Stock;