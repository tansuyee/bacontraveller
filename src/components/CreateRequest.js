import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Icon, Form, Button } from 'semantic-ui-react';
import styles from '../static/css/CreateRequest.module.css';
import { countryOptions } from '../constant';

const cloudName = 'kfwongdev';
const unsignedUploadPreset = 'cs3216_bacontraveller';

class CreateRequest extends Component {

  constructor(props) {
    super(props)
    this.imageFileRef = React.createRef();
    //this.imageFileHiddenRef = React.createRef();
    this.imagePreviewRef = React.createRef();
  }

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

  handleBrowse = (e) => {
    var url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/upload';
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // File uploaded successfully
        var response = JSON.parse(xhr.responseText);
        // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
        var url = response.secure_url;
        // Create a thumbnail of the uploaded image, with 150px width
        var tokens = url.split('/');
        tokens.splice(-2, 0, 'w_200,c_scale');
        var src = tokens.join('/');
        this.imagePreviewRef.current.src = src;

        this.handleChange(e, { name: 'item_image_url', value: src} );
      }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', e.target.files[0]);

    xhr.send(fd);
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
                      <label>Upload Image <Button className={styles.browseButton} size='mini' floated='right' onClick={() => this.imageFileRef.current.click()}>BROWSE</Button></label>
                      <br/>
                      <input className={styles.imageFile} ref={this.imageFileRef} onChange={this.handleBrowse} type='file' accept='image/*'/>
                      <img alt='' className={styles.uploadImage} ref={this.imagePreviewRef} src='https://via.placeholder.com/250x250'/>
                  </Form.Field>

                  <Button className={styles.submitButton} disabled={!isValid} type='submit' size='mini' floated='right' onClick={() => this.handleSubmit()}>SUBMIT</Button>
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
