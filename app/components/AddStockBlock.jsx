const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/AddStockBlock');
// socket.io
const io = require('socket.io-client');

/* the AddStockBlock component with Add Stock Button for managing adding stocks  */
class AddStockBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: "",
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddStock = this.handleAddStock.bind(this);
  }
  /*******************************************************/
  // Handlers //
  /*******************************************************/
  handleChange(event) {
    this.setState({
          ["stock"]:  event.target.value
           });
  }
  /*******************************************************/
  handleAddStock() {
      /********/
      let that = this;
      const xhr = new XMLHttpRequest();
      
      xhr.open('POST', '/add-stock', true);
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
          if(response.hasOwnProperty("error")) {
            that.setState({
              ["error"]: "Stock not found"
            });
          }
          else {
            that.setState({
              ["error"]: ""
            });
          console.log(response);
            // listener on CONNECTION
            const socket = io.connect();
            socket.emit('add', response.symbol);
          }
        }
      //delete line above??
    event.preventDefault();
  }
  /*******************************************************/
  render() {
      return (
        <div className="AddStockBlock_div">
              {this.state.error}
              <input type="text" value={this.state.value} onChange={this.handleChange} size="40"/>
              <button onClick={this.handleAddStock}>AddStockBlock</button>
        </div>
      );
    }
};

module.exports = AddStockBlock;