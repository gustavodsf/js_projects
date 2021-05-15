"use strict";
import { bindActionCreators }  from 'redux';
import { cleanAdminJobIsDone } from '../actions/index';
import { Component }           from 'react';
import { connect }             from 'react-redux';
import { Link }                from 'react-router';
import { login }               from '../actions/index';
import { goToRegional }        from '../actions/index';
import React                   from 'react';
import { toastr }              from 'react-redux-toastr';
import * as msg                from '../shared/msg.types';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {password: 0};
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.error == 0){
        this.props.cleanAdminJobIsDone() 
        this.props.goToRegional();
      }else if(nextProps.error > 1){
        toastr.error(msg.ERROR, msg.PASSWORD_DIDNT_MATCH)
      }
  }
  
  render() {
      const {state: { password}, 
             props: { error }} = this;

    const  onLogin = (e) =>  {
      e.preventDefault()
      this.props.login(this.state.password);
    }

    return(
      <div className="col-sm-9 col-md-6" id="container">
        <div id="header">
          <Link to="/">Menu</Link>
        </div>
        <div id="containerMenu">
          <form onSubmit= { onLogin }>
            <div className="form-group">
              <label id="senhaLabel" htmlFor="senha" className="col-form-label"> Senha</label>
              <input className="form-control input" type="password" id="senha" autofocus onChange={(e)=>this.setState({password: e.target.value})}/>
            </div>
            <button type="submit" className="btn btn-success" > Logar </button>
          </form>
        </div>
        <div id="footer">
          <div id="text">
            <span className="matriz">Matriz Três Rios/RJ (24) 2251-5050</span> <br />
            <span className="end">Avenida Condessa do Rio Novo, 881 - Centro CEP: 25803-000</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(  (state, ownProps) => ({
  error:   state.admin.error
}),{ 
   login,
   cleanAdminJobIsDone,
   goToRegional
})(Login)