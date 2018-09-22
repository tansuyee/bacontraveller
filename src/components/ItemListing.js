import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button, Card, Grid, Header, Image } from 'semantic-ui-react';
import styles from '../static/css/ItemListing.module.css';

function getPosts(props) {
  return _.filter(props.posts, ['country_from', props.match.params.country]);
}

class ItemListing extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }

  renderPost(post) {
    return (
      <Card key={post.id}>
        <Image src={post.item_image_url} />
        <Image className={styles.itemAuthor} src={post.User.image_url || "https://randomuser.me/api/portraits/women/68.jpg"} size='mini' circular centered />
        <Card.Content className={styles.itemContent} textAlign='center'>
          <Card.Header className={styles.itemName}>{post.item_name}</Card.Header>
          <Card.Meta className={styles.itemMeta}>Willing to pay {post.price}</Card.Meta>
          <Card.Description>
            <Button className={styles.itemStatus} size='mini'
              onClick={() => this.props.history.push(`/item-detail/${post.id}`)}>OPEN</Button>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }

  render() {
    const posts = getPosts(this.props);

    const rows = posts.map((post) => {
      return this.renderPost(post);
    })

    return (
      <div className={styles.container}>
        <Grid container>
          <Grid.Row>
            <Grid.Column>
              <Header className={styles.title} as='h1'>
                <span>{this.props.match.params.country}</span>
                <Header.Subheader className={styles.titleSubheader}>{posts.length} Posts</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Card.Group className={styles.itemList} itemsPerRow={2}>
                  {rows}
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

export default connect(mapStateToProps, actions)(ItemListing);
