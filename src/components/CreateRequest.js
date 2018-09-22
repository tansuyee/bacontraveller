import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Icon, Form, Button, Image } from 'semantic-ui-react';
import styles from '../static/css/CreateRequest.module.css';
import { countryOptions } from '../constant';

class CreateRequest extends Component {

  state = {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit() {
    this.props.createPost(this.state);
    this.props.history.goBack();
  }

  isValid() {
    let { state } = this;
    if (Object.keys(state).length !== 6) return false;
    for (let key of Object.keys(state)) {
      if (state[key] === "") return false;
    }
    return true;
  }

  render() {
    let isValid = this.isValid();

    return (
      <div>
        <Icon className={styles.back} size='big' name='arrow left' onClick={this.props.history.goBack} />

        <div className={styles.container}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Form className={styles.createRequestForm} inverted>
                  <Form.Input required label='Item Name' name='item_name' placeholder='Item name' onChange={this.handleChange} />
                  <Form.TextArea required label='Description' name='description' placeholder='Request description' rows={5} onChange={this.handleChange} />
                  <Form.Group widths='equal'>
                      <Form.Dropdown required label='Buy From' name='country_from' placeholder='Select Country' fluid search selection options={countryOptions} onChange={this.handleChange}/>
                      <Form.Dropdown required label='Deal In' name='country_to' placeholder='Select Country' fluid search selection options={countryOptions} onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Input required label='Willing to Pay' name='price' placeholder='Amount' onChange={this.handleChange} />

                  <Form.Field>
                      <label>Upload Image</label>
                      <Image src='https://via.placeholder.com/350x350' centered/>
                  </Form.Field>
                  <Form.Input required label='Image URL (FOR NOW)' name='item_image_url' placeholder='Need to replace this with uploading image' onChange={this.handleChange} />
                  <Button disabled={!isValid} type='submit' onClick={() => this.handleSubmit()}>Submit</Button>
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
  };
}

export default connect(mapStateToProps, actions)(CreateRequest);
