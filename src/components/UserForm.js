import _ from 'lodash';
import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Confirm, Grid, Icon, Form, Button, Loader } from 'semantic-ui-react';
import styles from '../static/css/CreateRequest.module.css';

const cloudName = 'kfwongdev';
const unsignedUploadPreset = 'cs3216_bacontraveller';

class UserForm extends Component {

  constructor(props) {
    super(props)
    this.imageFileRef = React.createRef();
    this.imagePreviewRef = React.createRef();
    this.state = {}
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id)
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

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
    this.props.editUser(this.props.match.params.id, _.omit(this.state, 'open'))
    this.props.history.goBack();
  }

  render() {
    if (_.isEmpty(this.props.users)) {
      return (<Loader />)
    }

    let user = this.props.users[this.props.match.params.id];

    return (
      <div>
        <Icon className={styles.back} size='big' name='arrow left' onClick={this.props.history.goBack} />

        <div className={styles.container}>
          <Grid container>
            <Grid.Row>
              <Grid.Column>
                <Form className={styles.createRequestForm} inverted>
                  <Form.Input label='Email' name='email' placeholder='Email Address'
                    defaultValue={user.email}
                    onChange={this.handleChange}
                  />
                  <Form.Input label='Username' name='username' placeholder='Display Name'
                    defaultValue={user.username}
                    onChange={this.handleChange}
                  />
                  <Form.Input label='Password' name='password' placeholder='New Password' type='password'
                    defaultValue=''
                    onChange={this.handleChange}
                  />
                  <Form.Field>
                      <label>Upload New Profile Image<Button className={styles.browseButton} size='mini' floated='right' onClick={() => this.imageFileRef.current.click()}>BROWSE</Button></label>
                      <br/>
                      <input className={styles.imageFile} ref={this.imageFileRef} onChange={this.handleBrowse} type='file' accept='image/*'/>
                      <img alt='' className={styles.uploadImage} ref={this.imagePreviewRef} src={user.image_url}/>
                  </Form.Field>
                  <Button type='submit' onClick={() => this.open()}>Submit</Button>
                  <Confirm
                    confirmButton="YES"
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={() => {this.handleSubmit(); this.close();}} />
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
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(UserForm);
