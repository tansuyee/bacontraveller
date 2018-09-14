import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import styles from './static/css/Home.module.css'

class Home extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.title} as='h1'>
                <span>Pork belly kevin ham hock</span>
                <Header.Subheader className={styles.titleSubheader}>Leberkas biltong hamburger, bacon sausage swine capicola. </Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Home;
