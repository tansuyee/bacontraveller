import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Icon, Header, Card, Image, Statistic, Feed, Loader } from 'semantic-ui-react';
import styles from '../static/css/Profile.module.css';
import moment from 'moment';

class Profile extends Component {

  componentDidMount() {
    if (this.props.auth.isLoggedIn) {
      this.props.getUser(this.props.auth.login.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isLoggedIn !== prevProps.auth.isLoggedIn) {
      this.props.getUser(this.props.auth.login.user.id);
    }
  }

  renderItem(item) {
    return(
      <Feed.Event key={item.id}>
          <Feed.Label>
              <img alt='' src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          </Feed.Label>
          <Feed.Content>
              <Feed.Summary>
                  <Feed.User>Elliot Fu</Feed.User> added you as a friend
                  <Feed.Date>1 Hour Ago</Feed.Date>
              </Feed.Summary>
              <Feed.Extra images>
                  <a>
                      <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  </a>
                  <a>
                      <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                  </a>
              </Feed.Extra>
              <Feed.Meta>
                  <Feed.Like>
                      <Icon name='like' />
                      4 Likes
                  </Feed.Like>
              </Feed.Meta>
          </Feed.Content>
      </Feed.Event>
    );
  }

  renderRequestsOrOfferings(buy, isRequest) {
    return (
      <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.plannedTripTitle}>
                { isRequest? 'Requests' : 'Offerings' } ({buy.length})
              </Header>
              { !buy.length &&
                <p className={styles.titleSubheader}>There is no { isRequest? 'requests' : 'offerings' }.</p>
              }
            </Grid.Column>
          </Grid.Row>
          { buy.length !== 0 &&
            <Grid.Row>
              <Grid.Column>
                <Feed className={styles.plannedTripContent}>
                  {_.orderBy(buy, 'createdAt', 'desc').map((item) => {
                    return this.renderItem(item);
                  })}
                </Feed>
              </Grid.Column>
            </Grid.Row>
          }
      </Grid>
    );
  }

  render() {
    console.log(this.props);
    if (_.isEmpty(this.props.users)) {
      return (
        <Loader />
      );
    }
    if (!this.props.auth.isLoggedIn) {
      return (
        <div className={styles.notLoggedIn}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Header className={styles.title} as='h1'>
                  <span>You are not logged in.</span>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      )
    }

    const currUser = this.props.users[this.props.auth.login.user.id];

    const userStats = [
        { key: 'dealClosed', label: 'Deal Closed', value: currUser.deals_closed_count },
        { key: 'followers', label: 'Followers', value: currUser.followers_count },
        { key: 'following', label: 'Following', value: currUser.following.length },
    ]
    return (
      <div className={styles.container}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.title} as='h1'>
                <span>Profile</span>
              </Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Card>
                <Card.Content>
                 { currUser.image_url ?
                   <Image floated='left' size='tiny' src={currUser.image_url} /> :
                   <Image floated='left' size='tiny' src='https://randomuser.me/api/portraits/women/8.jpg' />
                 }
                <Card.Header>
                  {currUser.username}
                  <Header.Subheader className={styles.rank}>
                    Joined {moment(currUser.createdAt).format("MMMM Do YYYY")}
                  </Header.Subheader>
                  </Card.Header>
                  <Card.Meta className={styles.bio}>
                    Take only memories, leave only footprints.
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Statistic.Group className={styles.statistics} widths='three' items={userStats} size='tiny' color='grey' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
              <div className={styles.subContainer}>
                {this.renderRequestsOrOfferings(currUser.buy, true)}
                {this.renderRequestsOrOfferings(currUser.sell, false)}
              </div>
          </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(Profile);
