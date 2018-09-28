import _ from 'lodash';
import React, { Component } from 'react';
import { Grid, Header, Card, Image, Comment, Loader } from 'semantic-ui-react';
import styles from '../static/css/Home.module.css';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { defaultImageUrl } from '../constant';

class Home extends Component {

  componentDidMount() {
    this.props.getAllPosts();
  }

  renderComment(comment) {
    return (
      <Comment key={comment.id}>
        <Comment.Avatar size='tiny' src={comment.User.image_url || defaultImageUrl} />
        <Comment.Content>
          <Comment.Author className={styles.itemAuthor}>{comment.User.username}</Comment.Author>
          <Comment.Text>{comment.text}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }

  renderTopComments(comments) {
    return (
      <Comment.Group>
        { comments.slice(0, 2).map((comment) => {
          return this.renderComment(comment);
        })}
      </Comment.Group>
    );
  }

  renderPost(post) {
    return (
      <Card fluid key={post.id} as={Link} to={`/item-detail/${post.id}`}>
        <Image src={post.item_image_url}/>
        <Card.Content>
          <Card.Header className={styles.itemTitle}>{post.item_name}</Card.Header>
          <Card.Meta>{moment(post.createdAt).fromNow()}</Card.Meta>
          <Card.Description>{post.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.renderTopComments(post.comments)}
        </Card.Content>
      </Card>
    );
  }

  renderRecentPosts(posts) {
    let topPosts =  _.orderBy(posts, 'createdAt', 'desc').slice(0,11);
    return topPosts.map((post) => this.renderPost(post));
  }

  render() {
    console.log(this.props);
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
              { _.isEmpty(this.props.posts) ?
                <Loader /> :
                this.renderRecentPosts(this.props.posts)
              }
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    posts: state.posts
  }
}

export default connect(mapStateToProps, actions)(Home);
