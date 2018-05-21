import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addWord } from '../../../services/word';
import { STATUS_ICON, UPLOAD_STATUS } from '../../../constants/app';

const initState = {
  word: '',
  translation: '',
  error: null,
  uploadStatus: UPLOAD_STATUS.DEFAULT
};

class AddWordFormComponent extends Component {
  state = initState;

  updateUploadStatusToDefault = () => {
    setTimeout(() => {
      this.setState(initState);
    }, 2000);
  };

  handleUpload = () => {
    const { word, translation } = this.state;

    addWord(word, translation)
      .then((response) => {
        if (response.error_msg) {
          this.setState({
            error: response.error_msg,
            uploadStatus: UPLOAD_STATUS.ERROR
          });
          this.updateUploadStatusToDefault();
        } else {
          this.setState({
            ...initState,
            uploadStatus: UPLOAD_STATUS.SUCCESS
          });
          this.updateUploadStatusToDefault();
        }
      })
      .catch(e => {
        this.setState({ error: e.message });
        this.updateUploadStatusToDefault();
      });
  };

  handleChangeWord = e => {
    this.setState({ word: e.target.value });
  };

  handleChangeTranslation = e => {
    this.setState({ translation: e.target.value });
  };

  render() {
    const { word, translation, error, uploadStatus } = this.state;

    return (
      <form className="ui large form add-word-form">
        <div className="ui stacked segment">
          <div className="field">
            <div className="ui left icon input">
              <i className="pencil alternate icon"></i>
              <input
                value={ word } type="text" name="email" placeholder="Word"
                onChange={ this.handleChangeWord }
              />
            </div>
          </div>
          <div className="field">
            <div className="ui left icon input">
              <i className="pencil alternate icon"></i>
              <input value={ translation } type="text" name="password" placeholder="Translation"
                     onChange={ this.handleChangeTranslation }/>
            </div>
          </div>
          <div className="ui fluid large teal submit button left icon" onClick={ this.handleUpload }>
            <i className={ `${ STATUS_ICON[uploadStatus] } icon big` }></i>
            <div style={ { marginTop: 5 } }>Upload</div>
          </div>
        </div>

        { error && <div className="ui red message"> { error } </div> }

      </form>
    );
  }
}

AddWordFormComponent.propTypes = {
  onLogin: PropTypes.func
};

export default AddWordFormComponent;
