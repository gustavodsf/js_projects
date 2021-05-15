"use strict";
import { bindActionCreators }            from 'redux';
import { cleanRefuelJobIsDone }          from '../actions/index';
import { Component }                     from 'react';
import { connect }                       from 'react-redux';
import { fuelling }                      from '../actions/index';
import { Link }                          from 'react-router';
import { MaskedInput }                   from 'react-text-mask';
import React                             from 'react';
import { saveRefuel }                    from '../actions/index';
import { validateAmountFuel }            from '../actions/index';
import { validateBusDriverRegistration } from '../actions/index';
import { validateBusNumber }             from '../actions/index';
import { validateOdomter }               from '../actions/index';
import { toastr }                        from 'react-redux-toastr';
import * as msg                          from '../shared/msg.types';

class Fuelling extends Component {
  constructor(props) {
    super(props)
    this.state = {registration: 0, odometer: 0, fuel: 0, amountFuel: 0, redraw: false, oldError: -1};
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.oldError != nextProps.error && nextProps.error == 0){
      toastr.success(msg.SUCCESS, msg.REFUEL_SAVED);
      this.state = {registration: 0, odometer: 0, fuel: 0, amountFuel: 0, redraw: !this.state.redraw};
      this.props.cleanRefuelJobIsDone(); 
    }else if(this.state.oldError != nextProps.error && nextProps.error > 1){
      toastr.error(msg.ERROR, msg.REFUEL_NOT_SAVED);
      this.state.oldError = nextProps.error;
    }
  }
  
  render() {
    const {state: { registration, busNumber, odometer, fuel }, 
          props: { registration_error, bus_driver, busNumber_error,bus_data, 
                    fuel_error, odometer_error, system_message }} = this;

    const  onFuelling = (e) =>  {
      e.preventDefault()
      let data = {
        registration: this.state.registration,
        busNumber:    this.state.busNumber,
        odometer:     this.state.odometer,
        amountFuel:   this.state.fuel,
      }
      this.props.saveRefuel(data);
    }

    const  onValidateBusDriver = (e) =>  {
      e.preventDefault()
      if (this.state.registration == "" || !this.state.registration.trim()) {
        return
      }
      this.props.validateBusDriverRegistration( this.state.registration )
    }

    const  onValidadeBusNumber = (e) =>  {
      e.preventDefault()
      if (this.state.busNumber  == ""  || !this.state.busNumber.trim()) {
        return
      }
      this.props.validateBusNumber( this.state.busNumber )
    }

    const  onValidateOdometer = (e) =>  {
      e.preventDefault()
      if (this.state.odometer == "" || !this.state.odometer.trim()) {
        return
      }
      this.props.validateOdomter( this.state.odometer, this.state.busNumber )
    }

    const  onValidateFuel = (e) =>  {
      e.preventDefault()
      if (this.state.busNumber  == ""  || !this.state.busNumber.trim()) {
        return
      }
      this.props.validateAmountFuel( this.state.fuel, this.state.busNumber )
    }

    return(
      <div className="col-sm-9 col-md-6" id="container">
        <div className="col-sm-2" id="coluna1"> 
          <div id="logoProgresso">
            <image id="imgLogoProgresso" src="./assets/image/logo_progresso.png" alt="Logo Progresso"/>
          </div>
          <div id="menu">
            <div className="btn-group-vertical pro-menu">
              <Link type="button" id="proBtnMenu" className="btn btn-warning pro-btn-menu" to="/">
                <image className="icone_botoes" src="./assets/image/menu.png" alt="icone_abastecimento" /><br/>Menu
              </Link>
              <Link type="button" id="proBtnEncerrarJornada" className="btn btn-warning pro-btn-menu" to="/close/workload">
                <image className="icone_botoes" src="./assets/image/fechar.png" alt="icone_abastecimento"/><br />Encerrar Jornada
              </Link>
              <Link type="button" id="proBtnOleoMotor" className="btn btn-warning pro-btn-menu" to="/motor/oil">
                <image className="icone_botoes" src="./assets/image/oleo_motor.png" alt="icone_abastecimento"/><br />Óleo Motor
              </Link>
              <Link type="button" id="proBtnAbastecimento" className="btn btn-warning pro-btn-menu" to="/fuelling">
                <image className="icone_botoes" src="./assets/image/gas_station.png" alt="icone_abastecimento" /><br />Abastecimento
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
                <h3>Abastecimento</h3>
              </div>
              <div className="pro-content">
                  <form onSubmit= { onFuelling }>
                    <div className="systemMessage">
                      { system_message }
                    </div>
                    <div className="form-group">
                      <label id="numeroCarroLabel" htmlFor="numeroCarro" className="col-form-label">Número Carro</label>
                      <input className="form-control input" type="text"  id="numeroCarro" onChange={(e)=>this.setState({busNumber: e.target.value})}   
                            key={this.state.redraw} autofocus  onBlur={ onValidadeBusNumber }/>
                      <div className="erroMessage">
                        { busNumber_error }
                      </div>
                      <div className="sucessMessage">
                        { bus_data }
                      </div>
                    </div>
                    <div className="form-group">
                      <label id="matriculaMotoristaLabel" htmlFor="matriculaMotorista" className="col-form-label">Matrícula Motorista</label>
                      <input className="form-control input" type="text" id="matriculaMotorista" onChange={(e)=>this.setState({registration: e.target.value})} 
                            key={this.state.redraw}  autofocus  onBlur={ onValidateBusDriver }/>
                      <div className="erroMessage">
                        { registration_error }
                      </div>
                      <div className="sucessMessage">
                        { bus_driver }
                      </div>
                    </div>
                    <div className="form-group">
                      <label id="odometroLabel" htmlFor="odometro" className ="col-xs-4 col-form-label" >Odômetro (KM)</label>
                      <input className ="form-control input" type="text" id="odometro" disabled={ !this.state.busNumber  || busNumber_error  } 
                            onChange={(e)=>this.setState({odometer: e.target.value})} key={this.state.redraw} autofocus  onBlur={ onValidateOdometer } />
                      <div className="erroMessage">
                        { odometer_error }
                      </div>
                    </div>
                    <div className="form-group">
                      <label id="combustivelLabel" htmlFor="combustivel"  className="col-form-label">Combustível (L)</label>
                      <MaskedInput  mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]} className="form-control input" type="text"  id="combustivel" disabled={ !this.state.busNumber || busNumber_error } 
                                    onChange={(e)=>this.setState({fuel: e.target.value})}  autofocus  onBlur={ onValidateFuel }  key={this.state.redraw} />
                      <div className="erroMessage">
                        { fuel_error }
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-warning" id="cadAbastecimento">Salvar Abastecimento</button>
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
    registration_error: state.fuelling.registration_error,
    bus_driver:         state.fuelling.bus_driver,
    busNumber_error:    state.fuelling.busNumber_error,
    bus_data:           state.fuelling.bus_data,
    fuel_error:         state.fuelling.fuel_error,
    odometer_error:     state.fuelling.odometer_error,
    error:              state.fuelling.error
  }),{ 
    fuelling, 
    validateBusDriverRegistration,  
    validateBusNumber,
    validateOdomter,
    validateAmountFuel,
    saveRefuel,
    cleanRefuelJobIsDone
  })(Fuelling)