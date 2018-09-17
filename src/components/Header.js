import React from 'react';
import { Grid, Icon, Menu, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styles from '../static/css/Header.module.css';

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isSidebarVisible: false }

        this.onClickMenu = this.onClickMenu.bind(this)
    }

    onClickMenu = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible })
    onSidebarHidden = () => this.setState({ isSidebarVisible: false })

    render() {
        const { isSidebarVisible } = this.state
        return (
            <div>
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='slide along' visible={isSidebarVisible} width='thin' onHide={this.onSidebarHidden} inverted vertical>
                      <Menu.Item name='home' active={this.props.path === "/"} as={Link} to="/" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Register' active={this.props.path === "/register"} as={Link} to="/register" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Profile' active={this.props.path === "/profile"} as={Link} to="/profile" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Country Listing' active={this.props.path === "/country-listing"} as={Link} to="/country-listing" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Item Listing' active={this.props.path === "/item-listing"} as={Link} to="/item-listing" onClick={this.onSidebarHidden} />
                      <Menu.Item name='Item Detail' active={this.props.path === "/item-detail"} as={Link} to="/item-detail" onClick={this.onSidebarHidden} />
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
            </div>
        )
    }
}

export default Header;
