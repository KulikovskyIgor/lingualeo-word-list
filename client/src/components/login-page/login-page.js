import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { login } from '../../services/login';

class LoginPage extends Component {
  state = {
    email: null,
    password: null,
    error: null
  };

  handleLogin = () => {
    const { email, password } = this.state;

    login(email, password)
      .then((response) => {
        if (response.error_msg) {
          this.setState({ error: response.error_msg });
        } else {
          this.props.onLogin(true);
        }
      })
      .catch(e => {
        this.setState({ error: e.message });
      });
  };

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleChangePassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <div className="ui middle aligned center aligned grid">
        <div className="five wide computer">
          <h2 className="ui teal image header">
            <div style={ { textShadow: '2px 2px #FFF' } } className="content">
              Add words to your Lingualeo's library
            </div>
          </h2>
          <form className="ui large form">
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    value={ email } type="text" name="email" placeholder="E-mail address"
                    onChange={ this.handleChangeEmail }
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="lock icon"></i>
                  <input value={ password } type="password" name="password" placeholder="Password"
                         onChange={ this.handleChangePassword }/>
                </div>
              </div>
              <div className="ui fluid large teal submit button" onClick={ this.handleLogin }>Login</div>
            </div>

            { error && <div className="ui red message"> { error } </div> }

          </form>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  onLogin: PropTypes.func
};

export default LoginPage;
