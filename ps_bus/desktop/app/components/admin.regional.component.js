"use strict";
import { bindActionCreators }  from 'redux';
import { Component }           from 'react';
import { connect }             from 'react-redux';
import { cleanAdminJobIsDone } from '../actions/index';
import { loadAdminFields }     from '../actions/index';
import { Link }                from 'react-router';
import React                   from 'react';
import { saveConfiguration }   from '../actions/index';
import { toastr }              from 'react-redux-toastr';
import * as msg                from '../shared/msg.types';

// Library use to talk to the electron and get things from database
const ipc = require('electron').ipcRenderer;

class AdminRegional extends Component {
  
  //constructor of the class, on this method we create all virables that we will use.
  constructor(props) {
    super(props)
    this.state = {garage: "", pump: "",fuel: "", oil: "", tank: "", garageList: "", 
                  tankList:"", pumpList: "", fuelList: "", oilList: "",redraw: false };
    
  }

  // Load components from the database to display on the screen.
  componentWillMount() {
    let garage = ipc.sendSync('SYNCHRONOUS_GARAGE');
    let tank   = ipc.sendSync('SYNCHRONOUS_TANK')  ;
    let pump   = ipc.sendSync('SYNCHRONOUS_PUMP')  ;
    let fuel   = ipc.sendSync('SYNCHRONOUS_FUEL')  ;
    let oil    = ipc.sendSync('SYNCHRONOUS_OIL')   ;
    let configuration = ipc.sendSync('SYNCHRONOUS_GET_CONFIGURATION')   ;
    this.state.garageList = garage;
    this.state.tankList = tank;
    this.state.pumpList = pump;
    this.state.fuelList = fuel;
    this.state.oilList = oil;
    this.state.garage = configuration.garage;
    this.state.tank = configuration.tank;
    this.state.pump = configuration.pump;
    this.state.fuel = configuration.fuel;
    this.state.oil = configuration.oil;
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.error == 0){
        toastr.success(msg.SUCCESS, msg.CONFIGURATION_SAVED)
        this.props.cleanAdminJobIsDone() 
      }else if(nextProps.error > 1){
        toastr.error(msg.ERROR, msg.CONFIGURATION_NOT_SAVED)
      }
  }

  render() {
    //virables used in the jsx 
    const {state: { garage, garageList },props: { tank, pump, fuel, oil, error }} = this;
    
    //method that call the admin.redux to change the configuration
    const  onConfigureRegional = (e) =>  { 
      e.preventDefault();
      let data = {
        pump: this.state.pump,
        oil: this.state.oil,
        garage: this.state.garage,
        tank: this.state.tank,
        fuel: this.state.fuel
      }
      this.props.saveConfiguration(data);
    }

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
                Menu
              </Link>
              <Link id="proBtConfig" className="btn btn-warning pro-btn-menu" to="/admin/regional">
                <image className="icone_botoes" src="./assets/image/config.png" alt="icone_configurar_regional" />
                Configurar Regional
              </Link>
              <Link id="proBtSenha" className="btn btn-warning pro-btn-menu" to="/admin/senha">
               <image className="icone_botoes" src="./assets/image/lock.png" alt="icone_alterar_senha" />
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
                <h3> Configurações da regional </h3>
              </div>
              <div className="pro-content">
                <form onSubmit= { onConfigureRegional }>
                  <div id="alterar-regional">
                    <div className="form-group">
                      <label id="garagemLabel" htmlFor="garagem" className="col-form-label">Garagem</label>
                      <select  className="form-control input" id="garagem" value={ this.state.garage } onChange={(e)=>this.setState({garage: e.target.value})}  >
                      { 
                        this.state.garageList.map(function(key) {return <option value={key.code}> {key.name} </option>})
                      }
                    </select>
                    </div>
                    <div className="form-group">
                      <label id="tanqueLabel" htmlFor="tanque" className="col-form-label">Tanque</label>
                      <select  className="form-control input" id="tanque" value={ this.state.tank } onChange={(e)=>this.setState({tank: e.target.value})}  >
                      { 
                        this.state.tankList.map(function(key) {return <option value={key.code}> {key.name} </option>})
                      }
                      </select>
                    </div>
                    <div className="form-group">
                      <label id="bombaLabel" htmlFor="bomba" className="col-form-label">Bomba</label>
                      <select className="form-control input" id="bomba" value={ this.state.pump } onChange={(e)=>this.setState({pump: e.target.value})}  >
                      { 
                        this.state.pumpList.map(function(key) {return <option value={key.code}> {key.name} </option>})
                      }
                      </select>
                    </div>
                    <div className="form-group">
                      <label id="combustivelLabel" htmlFor="combustivel" className="col-form-label">Combustível</label>
                      <select  className="form-control input" id="combustivel" value={ this.state.fuel } onChange={(e)=>this.setState({fuel: e.target.value})}  >
                      { 
                        this.state.fuelList.map(function(key) {return <option value={key.code}> {key.name} </option>})
                      }  
                      </select>
                    </div>
                    <div className="form-group">
                      <label id="oleoLabel" htmlFor="oleo" className="col-form-label">Óleo</label>
                      <select  className="form-control input" id="oleo" value={ this.state.oil } onChange={(e)=>this.setState({oil: e.target.value})}  >
                      { 
                        this.state.oilList.map(function(key) {return <option value={key.code}> {key.name} </option>})
                      }
                      </select>
                    </div>
                      <div className="form-group">
                      <button type="submit" className="btn btn-success" id="salvarDadosRegional">Salvar</button>
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
    garage:  state.admin.garage,
    tank:    state.admin.tank,
    pump:    state.admin.pump,
    fuel:    state.admin.fuel,
    oil:     state.admin.oil,
    error:   state.admin.error
 }),{ 
   saveConfiguration,
   loadAdminFields,
   cleanAdminJobIsDone,
})(AdminRegional)
