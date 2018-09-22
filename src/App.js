import React from 'react';
import Header from './components/Header';
import Main from './components/Main';

const App = (props) => (
  <div>
    <Header
      history={props.history}
      path={props.location.pathname}
      content={<Main />}
    />
  </div>
)

export default App;
