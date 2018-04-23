import React, { Component } from 'react';

import AddWordFormComponent from './components/add-word-form-component';
import AddWordDropzoneComponent from './components/add-word-dropzone-component';

class AddWordPage extends Component {
  render() {
    return (
      <div className="ui middle aligned center aligned grid add-word-page">
        <div className="five wide computer">
          <h2 className="ui teal image header">
            <div className="content">
              <div className="text-shadow">
                Add words to your Lingualeo's library
              </div>
              <div className="text-shadow">
                Just put any word to form or drop file with words
              </div>
            </div>
          </h2>
          <AddWordFormComponent/>
          <div className="ui middle aligned center aligned grid add-word-page-dropzone">
            <AddWordDropzoneComponent/>
          </div>
        </div>
      </div>
    );
  }
}

export default AddWordPage;
