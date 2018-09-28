import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';
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
import UserForm from './components/UserForm';
import PostForm from './components/PostForm';
import reducers from './reducers';
import withTracker from './withTracker';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(ReduxPromise, ReduxThunk),
    offline(offlineConfig)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <AuthContainer>
      <BrowserRouter>
        <Switch>
          <Route path="/register" component={withTracker(Register)} />
          <Route path="/item-detail/:id" component={withTracker(ItemDetail)} />
          <Route path="/user/:id" component={withTracker(UserView)} />
          <Route path='/user-edit/:id' component={withTracker(UserForm)} />
          <Route path='/post-edit/:id' component={withTracker(PostForm)} />
          <Route path='/create-request' component={withTracker(CreateRequest)} />
          <Route path="/" component={withTracker(App)} />
        </Switch>
      </BrowserRouter>
    </AuthContainer>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
