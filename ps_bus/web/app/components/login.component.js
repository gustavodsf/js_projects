"use strict";

import { connect } from 'react-redux';
import React from 'react';

import { login } from '../actions/index';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
      authenticationError: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if(typeof nextProps.authenticationError.hasError != 'undefined' &&
       nextProps.authenticationError.hasError &&
       (typeof this.state.authenticationError.hasError == 'undefined' ||
        nextProps.authenticationError.hasError != this.state.authenticationError.hasError)){
      alert("Usuário e/ou senha inválidos!");
    }
  }

  onLogin(e) {
    e.preventDefault();
    this.props.login(this.state.login, this.state.password);
  }

  render() {
    return(
      <div id="container" className="col-sm-9 col-md-6">
        <div id="header-pro">
          <img id="montagemLogo" src="./assets/image/marca_prosolutions.png" alt="montagem_progresso"/>
        </div>
        <form className="form_interface form-horizontal pro-login" onSubmit={this.onLogin.bind(this)}>
          <div className="form-group">
            <label className="control-label col-sm-2">Usu&aacute;rio:</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="user" placeholder="Digite o usu&aacute;rio" onChange={(element) => {this.setState({login: element.target.value})}} />
            </div>
          </div>
          <div className="form-group">
            <label className="control-label col-sm-2">Senha:</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="password" placeholder="Digite a senha" onChange={(element) => {this.setState({password: element.target.value})}} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-warning">Entrar</button>
            </div>
          </div>
        </form>
        <div id="footer" className="footer_interface">
          <div id="text">
            <span className="matriz">
              Prosolutions<br />
              <span className="end">
                Av. Embaixador Abelardo Bueno, 3500 - sala 619, Rio de
                Janeiro - RJ, 22775-040<br />
                Tel: (21) 96492-4227/ (21)99812-1110
              </span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(  (state, ownProps) => ({
  authenticationError: state.login.authenticationError
}),{
  login
})(Login)
