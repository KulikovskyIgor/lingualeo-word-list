import React, { Component } from 'react';

import AddWordFormComponent from './components/add-word-form-component';
import AddWordDropzoneComponent from './components/add-word-dropzone-component';

class AddWordPage extends Component {
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="five wide computer">
          <h2 className="ui teal image header">
            <div className="content">
              <div style={ { textAlign: 'center', textShadow: '2px 2px #FFF' } }>
                Add words to your Lingualeo's library
              </div>
              <div style={ { textAlign: 'center', textShadow: '2px 2px #FFF' } }>
                Just put any word to form or drop file with words
              </div>
            </div>
          </h2>
          <AddWordFormComponent/>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
            <AddWordDropzoneComponent/>
          </div>
        </div>
      </div>
    );
  }
}

export default AddWordPage;
