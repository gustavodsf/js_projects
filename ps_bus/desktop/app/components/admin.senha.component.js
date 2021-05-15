"use strict";
import { bindActionCreators }  from 'redux';
import { changePassword }      from '../actions/index';
import { cleanAdminJobIsDone } from '../actions/index';
import { Component }           from 'react';
import { connect }             from 'react-redux';
import { Link }                from 'react-router';
import React                   from 'react';
import { toastr }              from 'react-redux-toastr';
import { validatePassword }    from '../actions/index';
import * as msg                from '../shared/msg.types';

class AdminSenha extends Component {
  constructor(props) {
    super(props)
    this.state = {password: "", confirmation: "", redraw: false };
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.error == 0){
        toastr.success(msg.SUCCESS, msg.PASSWORD_CHANGED)
        this.state = { password: "", confirmation: ""};
        this.state.redraw = !this.state.redraw;
        this.props.cleanAdminJobIsDone()
      }else if(nextProps.error > 1){
        toastr.error(msg.ERROR, msg.PASSWORD_NOT_CHANGED)
      }
  }
  
  render() {
    const {state: { password, confirmation },  props: { error,passwordMatch }} = this;
    
    // Method the is called on the submit of the form and it validade the password and save on the database.
    const  onChangePassword = (e) =>  {
      e.preventDefault()
      let data = {
        password: this.state.password,
        confirmation: this.state.confirmation
      }
      this.props.changePassword(data);
    }

    // Call the admin-redux to see if the password is ok.
    const validatePassword = (e) =>{
      e.preventDefault()
      let data = {
        password: this.state.password,
        confirmation: this.state.confirmation
      }
      this.props.validatePassword(data);
    }

    //Jsx that is converted to genarate to change passwrord.
    return(
      <div className="col-sm-9 col-md-6" id="container">
        <div className="col-sm-2" id="coluna1"> 
          <div id="logoProgresso">
            <image id="imgLogoProgresso" src="./assets/image/logo_progresso.png" alt="Logo Progresso"/>
          </div>
          <div id="menu">
            <div className="btn-group-vertical pro-menu">
              <Link id="proBtnMenu" className="btn btn-warning pro-btn-menu" to="/">
               <image className="icone_botoes" src="./assets/image/menu.png" alt="icone_menu" />
               <br />
               Menu
              </Link>
              <Link id="proBtConfig" className="btn btn-warning pro-btn-menu" to="/admin/regional">
                <image className="icone_botoes" src="./assets/image/config.png" alt="icone_configurar_regional" />
                <br />
                Configurar Regional
              </Link>
              <Link id="proBtSenha" className="btn btn-warning pro-btn-menu" to="/admin/senha">
               <image className="icone_botoes" src="./assets/image/lock.png" alt="icone_alterar_senha" />
               <br />
               Alterar Senha
              </Link>
            </div>
          </div>
          <div id="logoProsolutions">
            <image id="imgLogoProsolution" src="./assets/image/marca_prosolutions.png" alt="Logo Prosolutions" />
          </div>
        </div>
        <div className="col-sm-6" id="coluna2" >
          <main role="main">
            <div id="encerrar-jornada" className="pro-content-abast">
              <div className="page-header">
                <h3> Alterar a Senha</h3>
              </div>
              <div className="pro-content">
                <form onSubmit= { onChangePassword }>
                  <div id="alterar-senha">
                    <div className="form-group">
                      <label id="novaSenhaLabel" htmlFor="novaSenha" className="col-form-label">Nova senha</label>
                      <input className="form-control input"  key={this.state.redraw} type="password" 
                             id="novaSenha" autofocus onChange={(e)=>this.setState({password: e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label id="confirmacaoSenhaLabel" htmlFor="confirmacaoSenha" className="col-form-label">Confirme a senha</label>
                      <input className="form-control input" key={this.state.redraw} type="password" 
                             id="confirmacaoSenha" onChange={(e)=>this.setState({confirmation: e.target.value})} 
                      onBlur={ validatePassword }/>
                      <div className="erroMessage">
                        { passwordMatch }
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit"className="btn btn-success" > Alterar Senha</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
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
  error:         state.admin.error,
  passwordMatch: state.admin.passwordMatch,
 }),{ 
  validatePassword,
  changePassword,
  cleanAdminJobIsDone
})(AdminSenha)