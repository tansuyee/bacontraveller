import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Grid, Icon, Form, Button, Loader } from 'semantic-ui-react';
import styles from '../static/css/CreateRequest.module.css';
import { countryOptions } from '../constant';

const cloudName = 'kfwongdev';
const unsignedUploadPreset = 'cs3216_bacontraveller';

class PostForm extends Component {

  constructor(props) {
    super(props)
    this.imageFileRef = React.createRef();
    this.imagePreviewRef = React.createRef();
    this.state = {}
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
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

        this.handleChange(e, { name: 'image_url', value: src} );
      }
    };

    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
    fd.append('file', e.target.files[0]);

    xhr.send(fd);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit() {
    console.log(this.state);
    this.props.editPost(this.props.match.params.id, this.state)
    this.props.history.goBack();
  }

  render() {
    if (_.isEmpty(this.props.posts)) {
      return (<Loader />)
    }

    let post = this.props.posts[this.props.match.params.id];

    return (
      <div>
        <Icon className={styles.back} size='big' name='arrow left' onClick={this.props.history.goBack} />

        <div className={styles.container}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Form className={styles.createRequestForm} inverted>
                  <Form.Input label='Item Name' name='item_name' placeholder='Item name'
                    defaultValue={post.item_name}
                    onChange={this.handleChange}
                  />
                  <Form.TextArea label='Description' name='description' placeholder='Request description' rows={5}
                   defaultValue={post.description}
                   onChange={this.handleChange}
                  />
                  <Form.Group widths='equal'>
                      <Form.Dropdown label='Buy From' name='country_from' placeholder='Select Country'
                        fluid search selection options={countryOptions}
                        defaultValue={post.country_from}
                        onChange={this.handleChange}
                      />
                      <Form.Dropdown label='Deal In' name='country_to' placeholder='Select Country'
                        fluid search selection options={countryOptions}
                        defaultValue={post.country_to}
                        onChange={this.handleChange}
                      />
                  </Form.Group>
                  <Form.Input label='Willing to Pay' name='price' placeholder='Amount'
                    defaultValue={post.price}
                    onChange={this.handleChange}
                  />

                  <Form.Field>
                      <label>Upload Image <Button className={styles.browseButton} size='mini' floated='right' onClick={() => this.imageFileRef.current.click()}>BROWSE</Button></label>
                      <br/>
                      <input className={styles.imageFile} ref={this.imageFileRef} onChange={this.handleBrowse} type='file' accept='image/*'/>
                      <img alt='' className={styles.uploadImage} ref={this.imagePreviewRef} src={post.item_image_url}/>
                  </Form.Field>

                  <Button className={styles.submitButton} type='submit' size='mini' floated='right' onClick={() => this.handleSubmit()}>SUBMIT</Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, actions)(PostForm);
