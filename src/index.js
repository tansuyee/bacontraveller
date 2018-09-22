import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import AuthContainer from './components/AuthContainer';
import Register from './components/Register';
import ItemDetail from './components/ItemDetail';
import UserView from './components/UserView';
import CreateRequest from './components/CreateRequest';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise, ReduxThunk)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <AuthContainer>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/item-detail/:id" component={ItemDetail} />
          <Route path="/user/:id" component={UserView} />
          <Route path='/create-request' component={CreateRequest} />
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </AuthContainer>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
