import React, { Component } from 'react';
import { Button, Transition } from 'semantic-ui-react'
import styles from '../static/css/Header.module.css';

class AddButton extends Component {
  constructor(props) {
      super(props)
      this.state = { isFabVisible: true }
  }

  render() {
    return (
      <Transition visible={this.state.isFabVisible} animation='scale' duration={500}>
          <Button className={styles.fab} icon='plus' size='huge' circular
            onClick={() => {this.props.history.push('/create-request')}}
          />
      </Transition>
    )
  }
}

export default AddButton;
