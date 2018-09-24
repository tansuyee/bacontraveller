import React, { Component } from 'react';
import { Grid, Header, Card, Image, Comment } from 'semantic-ui-react';
import styles from './static/css/Home.module.css'
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    // console.log(this.props.users);
    return (
      <div className={styles.container}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.title}>
                <span className={styles.titleBacon}>Bacon</span> <span className={styles.titleTraveller}>Traveller</span>
                <Header.Subheader className={styles.titleSubheader}>Shopping overseas had never been cheaper!</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.featured}>
                Recent Requests
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card fluid>
                <Image src='https://images.pexels.com/photos/588587/pexels-photo-588587.jpeg?auto=compress&cs=tinysrgb&h=350'/>
                <Card.Content>
                  <Card.Header className={styles.itemTitle}>Apple</Card.Header>
                  <Card.Meta>2 days ago.</Card.Meta>
                  <Card.Description>An apple a day keeps doctor away!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Comment.Group>
                  <Comment>
                    <Comment.Avatar size='tiny' src='https://randomuser.me/api/portraits/women/8.jpg' />
                    <Comment.Content verticalAlign='middle'>
                      <Comment.Author className={styles.itemAuthor}>Lin Han</Comment.Author>
                      <Comment.Text>Willing to pay $1000</Comment.Text>
                    </Comment.Content>
                  </Comment>
                  </Comment.Group>
                </Card.Content>
              </Card>
              <Card fluid>
                <Image src='https://images.pexels.com/photos/588587/pexels-photo-588587.jpeg?auto=compress&cs=tinysrgb&h=350'/>
                <Card.Content>
                  <Card.Header className={styles.itemTitle}>Apple</Card.Header>
                  <Card.Meta>2 days ago.</Card.Meta>
                  <Card.Description>An apple a day keeps doctor away!</Card.Description>
                </Card.Content>
                <Card.Content extra>
                <Comment.Group>
                  <Comment>
                    <Comment.Avatar size='tiny' src='https://randomuser.me/api/portraits/women/8.jpg' />
                    <Comment.Content verticalAlign='middle'>
                      <Comment.Author className={styles.itemAuthor}>Lin Han</Comment.Author>
                      <Comment.Text>Willing to pay $1000</Comment.Text>
                    </Comment.Content>
                  </Comment>
                  </Comment.Group>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Home);
