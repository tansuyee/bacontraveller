import React, { Component } from 'react';
import { Grid, Header, Form } from 'semantic-ui-react';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.fullbody}>
        <Grid verticalAlign='middle' style={{ height: '100%' }} centered container>
          <Grid.Column>
            <Form size='huge'>
              <Form.Field>
                <Header className={styles.logo} textAlign='center'>
                  BACON IPSUM
                  <Header.Subheader className={styles.logoSubheader}>Bacon ipsum dolor amet shank andouille jowl pastrami.</Header.Subheader>
                </Header>
              </Form.Field>
              <Form.Input placeholder='Email Address' />
              <Form.Input placeholder='Password' type='password'/>
              <Form.Button size='huge' fluid>SIGN IN</Form.Button>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
