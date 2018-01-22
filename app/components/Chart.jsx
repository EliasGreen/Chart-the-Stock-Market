const React = require('react');
const { connect } = require('react-redux');
const Link = require('react-router-dom').Link
const style = require('../styles/Chart');
const ReactHighstock = require('react-highcharts/ReactHighstock.src');

/* the Chart component for render Chart from stocks */
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: this.props.state,
      chart: <div className="spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
    };
  }
   /**************************************/
  componentWillReceiveProps(nextprops) {
          this.setState({
                ["stocks"]: nextprops.state,
                ["chart"]: <div className="spinner">
                      <div className="rect1"></div>
                      <div className="rect2"></div>
                      <div className="rect3"></div>
                      <div className="rect4"></div>
                      <div className="rect5"></div>
                    </div>
                 });
        /*************************/
        // set CHART
        /*************************/
          let that = this;
          // cast obj into arr
          let array = Object.values(nextprops.state);
          if(array.length > 0) {
             let u = 0;
             let series = [];
           // recursive function to get all data from server for stocks
              function setChart() {
                    const xhr = new XMLHttpRequest();

                    xhr.open('POST', '/get-stock', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


                    let body = 'stock=' + encodeURIComponent(array[u]["stock"]);


                    xhr.send(body);

                    xhr.onreadystatechange = function() {
                      if (this.readyState != 4) return;
                      if (this.status != 200) {
                        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
                        return;
                      }
                      let response = JSON.parse(this.responseText);
                      // grab only necessary info from response
                          let times = [];
                          for(let i = 0; i < response.length; i++) {
                             times.push([((new Date(response[i].date)).getTime())/1000, response[i].close]);
                          }
                      let data = times.reverse() 
                      let name = array[u]["stock"];
                    // set one serie and then push it into arr of series
                    let ser = {
                        name: name,
                        data: data,
                        tooltip: {
                          valueDecimals: 2
                        }
                    };
                    series.push(ser);
              /******************/
            if(u != array.length - 1) {
              setChart();
            }
           else if(u == array.length - 1) {
                let config = {
                  title: {
                    text: "Stocks"
                  },
                  series: series
                };
              /******************/
              that.setState({
                  ["chart"]: <ReactHighstock  config={config}/>
                 });
                }
                    // inc "index" for iterating
                    u = u + 1;
               }

          }
          // recursion
       setChart();
      }
    else {
           let config = {
                  title: {
                    text: "Stocks"
                  },
                  series: []
                };
              /******************/
              that.setState({
                  ["chart"]: <ReactHighstock  config={config}/>
                 });
    }
  }
  /**************************************/
  componentWillMount() {
    /*************************/
        // set CHART
        /*************************/
          let that = this;
          // cast obj into arr
          let array = this.state.stocks;
          if(array.length > 0) {
             let u = 0;
             let series = [];
           // recursive function to get all data from server for stocks
              function setChart() {
                    const xhr = new XMLHttpRequest();

                    xhr.open('POST', '/get-stock', true);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


                    let body = 'stock=' + encodeURIComponent(array[u]["stock"]);


                    xhr.send(body);

                    xhr.onreadystatechange = function() {
                      if (this.readyState != 4) return;
                      if (this.status != 200) {
                        alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
                        return;
                      }
                      let response = JSON.parse(this.responseText);
                      // grab only necessary info from response
                          let times = [];
                          for(let i = 0; i < response.length; i++) {
                             times.push([((new Date(response[i].date)).getTime())/1000, response[i].close]);
                          }
                       let data = times.reverse() 
                      let name = array[u]["stock"];
                    // set one serie and then push it into arr of series
                    let ser = {
                        name: name,
                        data: data,
                        tooltip: {
                          valueDecimals: 2
                        }
                    };
                    series.push(ser);
              /******************/
            if(u != array.length - 1) {
              setChart();
            }
           else if(u == array.length - 1) {
                let config = {
                  title: {
                    text: "Stocks"
                  },
                  series: series
                };
              /******************/
              that.setState({
                  ["chart"]: <ReactHighstock  config={config}/>
                 });
                }
                    // inc "index" for iterating
                    u = u + 1;
               }

          }
          // recursion
       setChart();
      }
    else {
           let config = {
                  title: {
                    text: "Stocks"
                  },
                  series: []
                };
              /******************/
              that.setState({
                  ["chart"]: <ReactHighstock  config={config}/>
                 });
    }
  }
  render() {
    return (
        <div className="chart_div">
        {this.state.chart}
        </div>
      );
    }
};

module.exports = Chart;