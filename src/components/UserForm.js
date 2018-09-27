import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Confirm, Grid, Icon, Form, Button, Image, Loader } from 'semantic-ui-react';
import styles from '../static/css/CreateRequest.module.css';

class UserForm extends Component {

  state = {}

  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit() {
    this.props.editUser(this.props.match.params.id, _.omit(this.state, 'open'))
    this.props.history.goBack();
  }

  render() {
    if (_.isEmpty(this.props.users)) {
      return (<Loader />)
    }

    let user = this.props.users[this.props.match.params.id];

    return (
      <div>
        <Icon className={styles.back} size='big' name='arrow left' onClick={this.props.history.goBack} />

        <div className={styles.container}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Form className={styles.createRequestForm} inverted>
                  <Form.Input label='Email' name='email' placeholder='Email Address'
                    defaultValue={user.email}
                    onChange={this.handleChange}
                  />
                  <Form.Input label='Username' name='username' placeholder='Username'
                    defaultValue={user.username}
                    onChange={this.handleChange}
                  />
                  <Form.Input label='Password' name='password' placeholder='New Password' type='password'
                    defaultValue=''
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                      <label>Upload New Profile Image</label>
                      <Image src='https://via.placeholder.com/350x350' centered/>
                  </Form.Field>
                  <Button type='submit' onClick={() => this.open()}>Submit</Button>
                  <Confirm
                    confirmButton="YES"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => {this.handleSubmit(); this.close();}} />
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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

export default connect(mapStateToProps, actions)(UserForm);
