import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Header, Form, Message, Icon } from 'semantic-ui-react';
import styles from '../static/css/Register.module.css';

class Register extends Component {

  constructor(props) {
      super(props)
      this.state = {
        signIn: true,
        email: '',
        username: '',
        password: '',
      }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { signIn, email, username, password } = this.state;

    if (signIn) {
      this.props.login({username: username, password: password});
    } else {
      this.props.signup({email: email, username: username, password: password});
      this.setState({email: '', username: '', password: ''})
    }
  }

  render() {
    const { signIn, email, username, password } = this.state;
    let isFetching = this.props.auth.login && this.props.auth.login.isFetching;

    if (this.props.auth.isLoggedIn) {
      this.props.history.push("/profile");
    }

    return (
      <div className={styles.container}>
        <Icon size='big' style={{paddingTop:30, paddingLeft:35}} name='arrow left' onClick={this.props.history.goBack} />
        <Grid className={styles.grid} verticalAlign='middle' centered container>
          <Grid.Column>
            <Form size='huge' onSubmit={this.handleSubmit}>
              <Form.Field>
                <Header className={styles.logo} textAlign='center'>
                  <span>BACON TRAVELLER</span>
                  <Header.Subheader className={styles.logoSubheader}>Helps you to bring back overseas products.</Header.Subheader>
                </Header>
              </Form.Field>
              { !signIn &&
                <Form.Input placeholder='Email Address' name='email' value={email} onChange={this.handleChange} />
              }
              <Form.Input placeholder='Username' name='username' value={username} onChange={this.handleChange}/>
              <Form.Input placeholder='Password' name='password' value={password} type='password' onChange={this.handleChange}/>
              { signIn ?
                <Form.Button size='huge' fluid loading={isFetching} disabled={isFetching}>SIGN IN</Form.Button> :
                <Form.Button size='huge' fluid loading={isFetching} disabled={isFetching}>SIGN UP</Form.Button>
              }
              <Form.Field>
                <Header textAlign='center'>
                  { signIn ?
                    <Header.Subheader className={styles.logoSubheader}>
                      Do not have an account yet? <b style={{color:'DodgerBlue'}} onClick={() => this.setState({signIn: false})}>Sign up</b>
                    </Header.Subheader> :
                    <Header.Subheader className={styles.logoSubheader}>
                      Already have an account? <b style={{color:'DodgerBlue'}} onClick={() => this.setState({signIn: true})}>Sign in</b>
                    </Header.Subheader>
                  }

                </Header>
              </Form.Field>
            </Form>
            { this.props.auth.login && this.props.auth.login.message &&
              <Message
                error
                header={this.props.auth.login.message}
                content='Try agian or sign up above'
              />
            }
            { this.props.auth.isSignedUp &&
              <Message
                success
                header='Sign Up Success!'
                content='You can proceed to sign in'
              />
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(Register);
