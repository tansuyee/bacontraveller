import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import faker from 'faker'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import _ from 'lodash'
import styles from '../static/css/SearchBox.module.css'


const source = _.times(5, () => ({
  title: "tadah",
  description: faker.company.catchPhrase(),
  image: faker.internet.avatar(),
  price: faker.finance.amount(0, 100, 2, '$'),
}))

class SearchBox extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid container className={styles.container}>
        <Grid.Column>
          <Search
            className={styles.searchInput}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
            size='big'
            fluid
          />
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, actions)(SearchBox);
