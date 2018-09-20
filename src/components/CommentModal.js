import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal, TextArea, Icon} from 'semantic-ui-react'
import * as actions from '../actions';

class CommentModal extends Component {
  state = {
    modalOpen: false,
    message: '',
   }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  handleTextChange(e) {
    this.setState({ message: e.target.value});
  }

  handleSubmit(deal) {
    if (this.state.message) {
      this.props.commentPost({
        id: this.props.postId,
        text: this.state.message
      });
    }
    this.handleClose();
    this.setState({ message: ''});
  }

  render() {
    return (
      <Modal
        trigger={
          <Button className={this.props.styling.offerToHelp} floated='right' size='mini'
            onClick={this.handleOpen.bind(this)}>
            <Icon name='add'/>Add
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose.bind(this)}
        size='small'
        closeIcon
      >
        <Modal.Header>Comment</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <TextArea autoHeight placeholder='Enter your comment'
                value={this.state.message} onChange={this.handleTextChange.bind(this)}/>
            </Form.Field>
          </Form>
          <br/>
          <Button color='blue' type='submit'
            onClick={(() => this.handleSubmit(this.props.deal))}> Submit
          </Button>
          <Button type='cancel'
            onClick={(() => this.handleClose.bind(this)())}> Cancel
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, actions)(CommentModal);
