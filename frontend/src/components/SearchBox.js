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

    this.props.getAllPosts();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.props.history.push(`/item-detail/${result.id}`)

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    const searchDB = Object.values(this.props.posts).map( post => {
      return {
        title: post.item_name,
        description: post.description,
        image: post.item_image_url,
        price: post.price
      }
    })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,

        results: _.filter(searchDB, isMatch),

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
    posts: state.posts
  };
}


export default connect(mapStateToProps, actions)(SearchBox);
