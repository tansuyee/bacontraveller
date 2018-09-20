import React, { Component } from 'react';
import { Grid, Header, Form, Button, Image } from 'semantic-ui-react';
import styles from './CreateRequest.module.css';


class CreateRequest extends Component {

  render() {
    return (
      <div className={styles.container}>
          <Grid container>
              <Grid.Row>
                  <Grid.Column>
                      <Form className={styles.createRequestForm} inverted>
                        <Form.Input label='Title' placeholder='Request title' />
                        <Form.TextArea label='Description' placeholder='Request description' rows={5}/>
                        <Form.Group widths='equal'>
                            <Form.Dropdown label='Buy From' placeholder='Select Country' fluid/>
                            <Form.Dropdown label='Deal In' placeholder='Select Country' fluid/>
                        </Form.Group>
                        <Form.Input label='Willing to Pay' placeholder='Amount' />

                        <Form.Field>
                            <label>Upload Image</label>
                            <Image src='https://via.placeholder.com/350x350' centered/>
                        </Form.Field>
                        <Button type='submit'>Submit</Button>
                      </Form>
                  </Grid.Column>
              </Grid.Row>
          </Grid>
      </div>
    )
  }
}

export default CreateRequest;
