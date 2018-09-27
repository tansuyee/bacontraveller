import React, { Component } from 'react';
import { Button, Confirm, Transition } from 'semantic-ui-react';
import {connect} from 'react-redux'
import styles from '../static/css/Header.module.css';

class AddButton extends Component {
  constructor(props) {
      super(props)
      this.state = { isFabVisible: true, modalOpen: false}
  }

  handleOpen = () => this.setState({ modalOpen: true })
  handleClose = () => this.setState({ modalOpen: false })

  render() {
    const { isLoggedIn } = this.props.auth;
    return (
      <div>
        <Transition visible={this.state.isFabVisible} animation='scale' duration={500}>
            <Button className={styles.fab} icon='plus' size='huge' circular
              onClick={isLoggedIn ? () => this.props.history.push("/create-request"): this.handleOpen}
            />
        </Transition>
        <Confirm
          confirmButton="Let's do it!"
          header="You're not signed in"
          content="Sign in to create post, accept offer and many more!"
          open={this.state.modalOpen}
          onCancel={this.handleClose}
          onConfirm={() => {this.props.history.push("/register");this.handleClose();}}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(AddButton)
