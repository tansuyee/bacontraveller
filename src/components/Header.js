import _ from 'lodash';
import React from 'react';
import { Confirm, Grid, Icon, Menu, Sidebar, Button, Transition, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import styles from '../static/css/Header.module.css';
import { defaultImageUrl } from '../constant';


class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isSidebarVisible: false, isFabVisible: true }

        this.onClickMenu = this.onClickMenu.bind(this)
    }

    componentDidUpdate(prevProps) {
      if (this.props.auth.isLoggedIn !== prevProps.auth.isLoggedIn && this.props.auth.isLoggedIn) {
        this.props.getUser(this.props.auth.login.user.id);
      }
    }

    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })
    onClickMenu = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible, isFabVisible: false })
    onSidebarHidden = () => this.setState({ isSidebarVisible: false, isFabVisible: true })

    renderSidebarTop() {
      const { isLoggedIn } = this.props.auth;

      if (!isLoggedIn || _.isEmpty(this.props.users) || _.isEmpty(this.props.users[this.props.auth.login.user.id])) {
        return (
          <div className={styles.sidebarTop}>
              <Image src={defaultImageUrl} bordered/>
              <h2 className={styles.sidebarUsername}>You are not signed in</h2>
          </div>
        )
      }

      let user = this.props.users[this.props.auth.login.user.id];

      return (
        <div className={styles.sidebarTop}>
            <Image src={user.image_url || defaultImageUrl} bordered/>
            <h2 className={styles.sidebarUsername}>{user.username}</h2>
        </div>
      );
    }

    render() {
        const { isSidebarVisible, isFabVisible } = this.state
        const { isLoggedIn } = this.props.auth
        return (
            <div>
                <Sidebar.Pushable className={styles.pushable}>
                    <Sidebar as={Menu} animation='push' visible={isSidebarVisible} width='thin' onHide={this.onSidebarHidden} style={{ width: 260 }} inverted vertical>
                        { this.renderSidebarTop() }

                        <Menu.Item name='home' active={this.props.path === "/"} as={Link} to="/" onClick={this.onSidebarHidden} />
                        <Menu.Item name='Profile' active={this.props.path === "/profile"} as={Link} to="/profile" onClick={this.onSidebarHidden} />
                        <Menu.Item name='Country Listing' active={this.props.path === "/country-listing"} as={Link} to="/country-listing" onClick={this.onSidebarHidden} />
                        { this.props.auth.isLoggedIn ?
                          <Button color='red' fluid onClick={this.open}>Log out</Button> :
                          <Menu.Item name='Sign In' active={this.props.path === "/register"} as={Link} to="/register" onClick={this.onSidebarHidden} />
                        }
                        <Confirm
                          confirmButton="YES"
                          open={this.state.open}
                          onCancel={this.close}
                          onConfirm={() => {this.props.logOut(); this.close();}} />
                    </Sidebar>

                    <Sidebar.Pusher>
                        <div className={styles.topBarShadow} />
                        <Grid container className={styles.pusher}>
                            <Grid.Row className={styles.topBar}>
                                <Grid.Column className={styles.menu} floated='left' width={5} textAlign="left">
                                    <Icon name='list layout' size='big' onClick={this.onClickMenu} link />
                                </Grid.Column>
                                <Grid.Column className={styles.search} floated='right' width={5} textAlign='right'>
                                    <Icon name='search' size='big' />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        {this.props.content}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <Transition visible={isFabVisible} animation='scale' duration={500}>
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
                  onConfirm={() => {this.props.history.push("/register");this.handleClose();}} />
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

export default connect(mapStateToProps, actions)(Header);
