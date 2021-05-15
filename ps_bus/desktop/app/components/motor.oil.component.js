"use strict";
import { bindActionCreators }   from 'redux';
import { cleanOilJobIsDone }    from '../actions/index';
import { Component }            from 'react';
import { connect }              from 'react-redux';
import { Link }                 from 'react-router';
import { MaskedInput }          from 'react-text-mask';
import React                    from 'react';
import { saveOilReposition }    from '../actions/index';
import { validateOilBusNumber } from '../actions/index';
import { toastr }               from 'react-redux-toastr';
import * as msg                 from '../shared/msg.types';

class MotorOil extends Component {
  constructor(props) {
    super(props)
    this.state = {busNumber: "", oil: 0, redraw: false, oldError: -1};
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.oldError != nextProps.error && nextProps.error == 0){
      toastr.success(msg.SUCCESS, msg.OIL_REPOSITION_SAVED);
      this.state = {busNumber: 0, oil: 0, redraw: !this.state.redraw};
      this.props.cleanOilJobIsDone(); 
    }else if(this.state.oldError != nextProps.error && nextProps.error > 1){
      toastr.error(msg.ERROR, msg.OIL_REPOSITION_NOT_SAVED);
      this.state.oldError = nextProps.error;
    }
  }
  
  render() {
    const {state: { busNumber, oil }, 
           props: { busNumber_error,bus_data,oil_error, system_message, error }} = this;
    
    const  onOilReposition = (e) =>  {
      e.preventDefault()
      let data = {
        busNumber: this.state.busNumber,
        oil:       this.state.oil
      }
      this.props.saveOilReposition(data);
    }

    const  onValidadeBusNumber = (e) =>  {
      e.preventDefault()
      if (this.state.busNumber == "" || !this.state.busNumber.trim()) {
        return
      }
      this.props.validateOilBusNumber( this.state.busNumber )
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
                <image className="icone_botoes" src="./assets/image/oleo_motor.png" alt="icone_abastecimento" /><br />Óleo Motor
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
                <h3>Óleo Motor</h3>
              </div>
              <div className="pro-content">
                <form onSubmit= { onOilReposition }>
                  <div id="oleo-motor">
                    <div className="systemMessage">
                        { system_message }
                    </div>
                    <div className="form-group">
                      <label id="numeroCarroOleoLabel" htmlFor="numeroCarroOleo" className="col-form-label">Número Carro</label>
                      <input className="form-control input" type="text"  id="numeroCarroOleo"autofocus onChange={(e)=>this.setState({busNumber: e.target.value})}
                        key={this.state.redraw} onBlur={ onValidadeBusNumber }/>
                      <div className="erroMessage">
                        { busNumber_error }
                      </div>
                      <div className="sucessMessage">
                        { bus_data }
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="oleoMotor" className="col-form-label">Óleo Motor</label>
                      <MaskedInput  mask={[/\d/, /\d/]} className="form-control input" type="text" disabled="true" id="oleoMotor" onChange={(e)=>this.setState({oil: e.target.value})} 
                        disabled={ !this.state.busNumber || busNumber_error } key={this.state.redraw} />
                      <div className="erroMessage">
                        { oil_error }
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-warning " id="cadOleoMotor"> Salvar Óleo </button>
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
  busNumber_error: state.motorOil.busNumber_error,
  bus_data:        state.motorOil.bus_data,
  oil_error:       state.motorOil.oil_error,
  error:           state.motorOil.error
 }),{ 
  saveOilReposition,
  validateOilBusNumber,
  cleanOilJobIsDone
})(MotorOil)