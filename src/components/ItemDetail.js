import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Header, Icon, Comment, Divider, Button, Item, Image, Loader } from 'semantic-ui-react';
import styles from '../static/css/ItemDetail.module.css';
import moment from 'moment';
import CommentModal from './CommentModal';

const SampleComment = () => (
    <Comment>
        <Comment.Avatar as={Image} src='https://randomuser.me/api/portraits/women/40.jpg' circular />
        <Comment.Content>
            <Comment.Author className={styles.commentAuthorName}>Jane Doe</Comment.Author>
            <Comment.Text>Shank shoulder picanha corned beef meatball, drumstick kielbasa sirloin brisket. Sirloin pork bresaola biltong leberkas kielbasa.</Comment.Text>
            <Comment.Actions className={styles.commentActions}>
              <Comment.Metadata><div>Today at 5:42PM</div></Comment.Metadata>
              <Comment.Action>
                <Icon name='reply' size='small' />
                <span> REPLY</span>
              </Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </Comment>
)

class ItemDetail extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  renderComment(comment) {
    return (
      <Comment>
        <Comment.Avatar as={Image} src={'https://randomuser.me/api/portraits/women/40.jpg'} circular />
        <Comment.Content>
          <Comment.Author className={styles.commentAuthorName}>Jane Doe</Comment.Author>
          <Comment.Text>{comment.text}</Comment.Text>
          <Comment.Actions className={styles.commentActions}>
            <Comment.Action>
              <div>{moment(comment.createdAt).fromNow()}</div>
              <Icon name='reply' size='small' />
              <span> REPLY</span>
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }

  renderComments(comments) {
    return comments.map((comment) => {
      return this.renderComment(comment);
    })
  }

  render() {
    console.log(this.props);
    const post = this.props.posts[this.props.match.params.id];

    if (_.isEmpty(post)) console.log("hmm");

    if (_.isEmpty(post)) return (<Loader />);


    return (
      <div className={styles.container}>
        <Image className={styles.itemImage} src={post.item_image_url} />
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Item className={styles.author}>
                  <Item.Image className={styles.authorImage} src={post.User.image_url || 'https://randomuser.me/api/portraits/women/40.jpg'} size='small' floated='left' />
                  <Item.Content>
                    <Item.Header className={styles.authorMeta}>
                      <span>Requested by </span>
                      <span className={styles.authorName}>{post.User.username}</span>
                      <Header.Subheader className={styles.datePosted}>
                        Posted {moment(post.createdAt).fromNow()}
                      </Header.Subheader>
                    </Item.Header>
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header className={styles.itemTitle}>{post.item_name}</Header>
                  <p className={styles.itemDescription}>{post.description}</p>
                  <Divider horizontal>
                    <Icon className={styles.descriptionExpand} name='angle double down' />
                  </Divider>
                  <Header className={styles.dealDetails}>
                    <Button className={styles.offerToHelp} floated='right' size='mini'
                      onClick={() => this.props.acceptPost(post.id)}>OFFER TO HELP</Button>
                    <span>Willing to pay </span>
                    <span className={styles.amount}>{post.price}</span>
                    <Header.Subheader>
                      <span>Buy from </span>
                      <span className={styles.dealLocation}>{post.country_from}</span>
                      <span>, deal in </span>
                      <span className={styles.dealLocation}>{post.country_to}</span>
                    </Header.Subheader>
                </Header>
              </Grid.Column>
            </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Header className={styles.commentSection}>
                    Comments
                    <CommentModal postId={post.id} styling={styles}/>
                  </Header>
                  <Divider fitted />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Comment.Group>
                    {this.renderComments(post.comments)}
                    <SampleComment />
                    <SampleComment />
                    <SampleComment />
                  </Comment.Group>
                </Grid.Column>
              </Grid.Row>
          </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, actions)(ItemDetail);
