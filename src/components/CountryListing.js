import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Header, Divider, Button, Card } from 'semantic-ui-react';
import styles from '../static/css/CountryListing.module.css';

class CountryListing extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }

  renderItem(item, index) {
    return (
      <Card key={index} image={item.item_image_url} />
    );
  }

  renderCountry(country, posts, index) {
    const items = _.orderBy(posts, 'createdAt', 'desc').slice(0, 6).map((post, index) => {
      return this.renderItem(post, index);
    })

    return (
      <Grid className={styles.content} key={index} container>
        <Grid.Row>
          <Grid.Column width={10}>
            <Header as='h2'>
              <span>{country}</span>
              <Header.Subheader className={styles.countryMeta}>{posts.length} Posts</Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column width={6}>
            <Button className={styles.browseAll} size='mini' compact
              onClick={() => (this.props.history.push(`/item-listing/${country}`))}>BROWSE ALL</Button>
          </Grid.Column>
          <Divider className={styles.countryDivider} fitted />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Card.Group className={styles.countryItems} itemsPerRow={3}>
              {items}
            </Card.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      );
  }

  render() {
    let rows;

    if (_.isEmpty(this.props.posts)) {
      rows = (<div>There is no available post</div>)
    } else {
      let byCountry = _.groupBy(this.props.posts, 'country_from');
      rows = _.keys(byCountry).map((country, index) => {
        return this.renderCountry(country, byCountry[country], index)
      })
    }

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.title} as='h1'>
                <span>Browse Requests By Country</span>
                <Header.Subheader className={styles.titleSubheader}>These are shopping tasks posted</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {rows}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(CountryListing);
