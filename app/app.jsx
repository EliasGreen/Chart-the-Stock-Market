const React = require('react');
const { render } = require('react-dom');
const actions = require('./actions');

// socket.io
const io = require('socket.io-client');

// router
const Route = require('react-router-dom').Route;
const BrowserRouter = require('react-router-dom').BrowserRouter;
const hashHistory = require('react-router-dom').hashHistory;

// redux
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const reducers = require('./reducers');

let store;

// get the current store of places from DB
      const xhr = new XMLHttpRequest();

      xhr.open('POST', '/get-stocks-db', true);

      xhr.send();

      xhr.onreadystatechange = function() {
        if (this.readyState != 4) return;
          if (this.status != 200) {
            alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
            return;
          }
          let response = JSON.parse(this.responseText);
          let initialState = [];
        
          for(let i = 0; i < response.length; i++) {
               initialState.push({stock: response[i]["stock"]});
            }
        
         store = createStore(reducers, initialState);
            
          store.subscribe( () => {
            console.log(store.getState());
          });

          /* Import Components */
          const Main = require('./components/Main');

          render((
            <Provider store={store}>
              <BrowserRouter>
                <div>
                  <Route exact path="/" component={Main}/>
                </div>
              </BrowserRouter>
            </Provider>), document.getElementById('main'));
        }
      
 // listener on CONNECTION
   const socket = io.connect();
    socket.on('add_user', function (stock) {
      console.log("add INGFDG " + stock);
      store.dispatch(actions.add_stock(stock))
    });
    socket.on('delete_user', function (stock) {
      console.log("delete " + stock);
      store.dispatch(actions.delete_stock(stock))
    });
