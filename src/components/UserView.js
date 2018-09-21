import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Header, Card, Image, Statistic, Icon, Item, Loader } from 'semantic-ui-react';
import styles from '../static/css/UserView.module.css';
import moment from 'moment';

class UserView extends Component {

  componentDidMount() {
    this.props.getUser(this.props.match.params.id);
  }

  renderItem(item, isRequest) {
    return(
      <Item key={item.id}>
        <Item.Image size='tiny' src={item.item_image_url} />

        <Item.Content verticalAlign='middle'>
          <Item.Header as={Link} to={`/item-detail/${item.id}`}>{item.item_name}</Item.Header>
          <Item.Meta>From {item.country_from}</Item.Meta>
          { item.transactions.length !== 0 &&
            <Item.Description>
              {item.transactions.length} transactions
            </Item.Description>
          }
          <Item.Extra>{moment(item.createdAt).fromNow()}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }

  renderRequestsOrOfferings(list, isRequest) {
    return (
      <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.plannedTripTitle}>
                { isRequest? 'Requests' : 'Offerings' } ({list.length})
              </Header>
              { !list.length &&
                <p className={styles.titleSubheader}>There is no { isRequest? 'requests' : 'offerings' }.</p>
              }
            </Grid.Column>
          </Grid.Row>
          { list.length !== 0 &&
            <Grid.Row>
              <Grid.Column>
                <Item.Group className={styles.plannedTripContent} unstackable divided>
                  {_.orderBy(list, 'createdAt', 'desc').map((item) => {
                    return this.renderItem(item, isRequest);
                  })}
                </Item.Group>
              </Grid.Column>
            </Grid.Row>
          }
      </Grid>
    );
  }

  render() {
    if (_.isEmpty(this.props.users)) {
      return (
        <Loader />
      );
    }

    const currUser = this.props.users[this.props.match.params.id];

    if (!currUser) {
      return (
        <Loader />
      );
    }

    const userStats = [
        { key: 'dealClosed', label: 'Deal Closed', value: currUser.deals_closed_count },
        { key: 'followers', label: 'Followers', value: currUser.followers_count },
        { key: 'following', label: 'Following', value: currUser.following.length },
    ]

    return (
      <div>
        <Icon className={styles.back} size='big' name='arrow left' onClick={this.props.history.goBack} />
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
            {this.renderRequestsOrOfferings(currUser.posts_buy, true)}
            {this.renderRequestsOrOfferings(currUser.transactions_sell, false)}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(UserView);
