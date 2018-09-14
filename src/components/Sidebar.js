import React, {Component} from "react";
import { Grid, Icon, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Sidebar from "react-sidebar";
import styles from '../static/css/Sidebar.module.css';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    this.onSetOpen = this.onSetOpen.bind(this);
  }

  onSetOpen(open) {
    this.setState({ open });
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open });

    if (ev) {
      ev.preventDefault();
    }
  }

  renderContent() {
    const links = [];

    for (let ind = 0; ind < 10; ind++) {
      links.push(
        <a key={ind} href="/" className={styles.sidebarLink}>
          Mock menu item {ind}
        </a>
      );
    }

    return (
        <div className={styles.content}>
          <Menu inverted vertical>
            <Menu.Item name='home' active={true} as={Link} to="/" onClick={() => this.toggleOpen()} />
            <Menu.Item name='Discover' active={false} onClick={() => this.toggleOpen()} />
            <Menu.Item name='Register' active={false} as={Link} to="/register" onClick={() => this.toggleOpen()} />
            <Menu.Item name='Profile' active={false} as={Link} to="/profile" onClick={() => this.toggleOpen()} />
          </Menu>
          <div className={styles.divider} />
          {links}
        </div>
    );
  }

  render() {

    const contentHeader = (
      <div className={styles.container}>
        <Grid container>
          <Grid.Column className={styles.menu} floated='left' width={5} textAlign='left'>
            <Icon name='th' size='big' onClick={() => this.onSetOpen(true)}/>
          </Grid.Column>
          <Grid.Column className={styles.search} floated='right' width={5} textAlign='right'>
            <Icon name='search' size='big' />
          </Grid.Column>
        </Grid>
      </div>
    );

    const sidebarProps = {
      sidebar: this.renderContent(),
      open: this.state.open,
      onSetOpen: this.onSetOpen
    };

    return (
      <Sidebar {...sidebarProps}>
        {contentHeader}
        <div className={styles.content}>
          <Menu inverted vertical>
            <Menu.Item name='home' active={true} as={Link} to="/" />
            <Menu.Item name='Discover' active={false} />
            <Menu.Item name='Register' active={false} as={Link} to="/register"/>
            <Menu.Item name='Profile' active={false} as={Link} to="/profile" />
          </Menu>
          <div className={styles.divider} />

        </div>
      </Sidebar>
    );
  }
}

export default SideBar;
