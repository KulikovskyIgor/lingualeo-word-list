import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { UPLOAD_STATUS } from '../../../constants/app';
import { addWords } from '../../../services/word';

const initState = {
  allUploadedCount: 0,
  successfullyUploadedCount: 0,
  uploadStatus: UPLOAD_STATUS.DEFAULT,
  error: null
};

const dropzoneStyle = {
  borderRadius: '50%',
  borderWidth: 1,
  height: 300,
  width: 300,
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  borderStyle: 'dashed',
  background: 'rgb(229, 255, 254)',
  borderColor: '#00b5ad',
  color: '#00b5ad',
  fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif',
  fontSize: 20
};

class AddWordDropzoneComponent extends Component {
  state = initState;

  handleDrop = (files) => {
    addWords(files[files.length - 1])
      .then((data) => {
        this.setState({
          uploadStatus: UPLOAD_STATUS.SUCCESS,
          allUploadedCount: data.length,
          successfullyUploadedCount: data.filter(i => !i.error_msg).length
        });
        this.updateUploadStatusToDefault();
      })
      .catch((e) => {
        this.setState({ error: e.message });
        this.updateUploadStatusToDefault();
      });

    this.setState({ uploadStatus: UPLOAD_STATUS.IN_PROGRESS });
  };

  updateUploadStatusToDefault = () => {
    setTimeout(() => {
      this.setState(initState);
    }, 5000);
  };

  render() {
    const { uploadStatus, allUploadedCount, successfullyUploadedCount, error } = this.state;

    return (
      <Dropzone
        style={ dropzoneStyle }
        onDrop={ this.handleDrop }>
        { uploadStatus === UPLOAD_STATUS.IN_PROGRESS && (
          <i style={ { fontSize: 50 } } className="spinner loading icon"></i>
        ) }
        { uploadStatus === UPLOAD_STATUS.DEFAULT && (
          <p>Try dropping some files here, or click to select files to upload.</p>
        ) }
        { uploadStatus === UPLOAD_STATUS.SUCCESS && (
          <div>
            Successfully uploaded { successfullyUploadedCount } from { allUploadedCount }
          </div>
        ) }
        { error && <div className="ui red message"> { error } </div> }
      </Dropzone>
    );
  }
}

AddWordDropzoneComponent.propTypes = {
  onLogin: PropTypes.func
};

export default AddWordDropzoneComponent;
