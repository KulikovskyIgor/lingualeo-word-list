import React, { Component } from "react";

import LoginPage from './components/login-page/login-page';
import AddWordPage from './components/add-word-page/add-word-page';

class App extends Component {
  state = {
    isAuth: sessionStorage.getItem('isAuth') || false
  };

  changeAuthStatus = isAuth => {
    this.setState({ isAuth });
    sessionStorage.setItem('isAuth', isAuth);
  };

  render() {
    const { isAuth } = this.state;

    return (
      <div>
        { !isAuth && <LoginPage onLogin={ this.changeAuthStatus }/> }
        { isAuth && <AddWordPage/> }
      </div>
    );
  }
}

export default App;
