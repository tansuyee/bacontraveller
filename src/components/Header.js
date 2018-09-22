import React from 'react';
import { Grid, Icon, Menu, Sidebar, Button, Transition, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from '../static/css/Header.module.css';
class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isSidebarVisible: false, isFabVisible: true }

        this.onClickMenu = this.onClickMenu.bind(this)
    }

    onClickMenu = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible, isFabVisible: false })
    onSidebarHidden = () => this.setState({ isSidebarVisible: false, isFabVisible: true })

    render() {
        const { isSidebarVisible, isFabVisible } = this.state
        return (
            <div>
                <Sidebar.Pushable className={styles.pushable}>
                    <Sidebar as={Menu} animation='push' visible={isSidebarVisible} width='thin' onHide={this.onSidebarHidden} style={{ width: 260 }} inverted vertical>
                        <div className={styles.sidebarTop}>
                            <Image src='https://randomuser.me/api/portraits/women/8.jpg' bordered/>
                            <h2 className={styles.sidebarUsername}>Jane Doe</h2>
                            <h6 className={styles.sidebarRank}>SuperTraveller</h6>
                        </div>
                        <Menu.Item name='home' active={this.props.path === "/"} as={Link} to="/" onClick={this.onSidebarHidden} />
                        <Menu.Item name='Register' active={this.props.path === "/register"} as={Link} to="/register" onClick={this.onSidebarHidden} />
                        <Menu.Item name='Profile' active={this.props.path === "/profile"} as={Link} to="/profile" onClick={this.onSidebarHidden} />
                        <Menu.Item name='Country Listing' active={this.props.path === "/country-listing"} as={Link} to="/country-listing" onClick={this.onSidebarHidden} />
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
                        onClick={() => this.props.history.push("/create-request")}
                    />
                </Transition>
            </div>
        )
    }
}

export default Header;
