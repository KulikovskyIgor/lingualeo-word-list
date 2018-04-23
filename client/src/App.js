import React, { Component } from "react";

import LoginPage from './components/login-page/login-page';
import AddWordPage from './components/add-word-page/add-word-page';

class App extends Component {
  state = {
    isAuth: false
  };

  changeAuthStatus = isAuth => {
    this.setState({ isAuth });
  };

  render() {
    const { isAuth } = this.state;

    return (
      <div className="App">
        { !isAuth && <LoginPage onLogin={ this.changeAuthStatus }/> }
        { isAuth && <AddWordPage/> }
      </div>
    );
  }
}

export default App;
