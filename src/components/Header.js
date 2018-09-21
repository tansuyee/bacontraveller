import React from 'react';
import { Grid, Icon, Menu, Sidebar, Button, Transition } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from '../static/css/Header.module.css';
class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isSidebarVisible: false, isFabVisible: true }

        this.onClickMenu = this.onClickMenu.bind(this)
    }

    onClickMenu = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible, isFabVisible: false })
    onSidebarHidden = () => this.setState({ isSidebarVisible: false, isFabVisible: true})

    render() {
        const { isSidebarVisible, isFabVisible} = this.state
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='push' visible={isSidebarVisible} width='thin' onHide={this.onSidebarHidden} inverted vertical>
                      <Menu.Item name='home' active={this.props.path === "/"} as={Link} to="/" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Register' active={this.props.path === "/register"} as={Link} to="/register" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Profile' active={this.props.path === "/profile"} as={Link} to="/profile" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Country Listing' active={this.props.path === "/country-listing"} as={Link} to="/country-listing" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Create Request' active={this.props.path === "/create-request"} as={Link} to="/create-request" onClick={this.onSidebarHidden} />
                    </Sidebar>

                    <Sidebar.Pusher>
                        <Grid container className={styles.pusher}>
                            <Grid.Row style={{paddingTop:35}}>
                                <Grid.Column className={styles.menu} floated='left' width={5} textAlign="left">
                                    <Icon name='th' size='big' onClick={this.onClickMenu} link />
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
                      onClick={() => this.props.history.push("/create-request")}
                    />
                </Transition>
            </div>
        )
    }
}

export default Header;
