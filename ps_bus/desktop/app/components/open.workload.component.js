"use strict";
import { bindActionCreators }         from 'redux';
import { Component }                  from 'react';
import { connect }                    from 'react-redux';
import { Link }                       from 'react-router';
import { openWorkload }               from '../actions/index';
import { validateRegistration }       from '../actions/index';
import { cleanOpenWorkLoadJobIsDone } from '../actions/index';
import { goToFuelling }               from '../actions/index';
import { toastr }                     from 'react-redux-toastr';
import React                          from 'react';
import { MaskedInput }                from 'react-text-mask';
import * as msg                       from '../shared/msg.types';


class OpenWorkload extends Component {
  constructor(props) {
    super(props)
    this.state = {registration: "",  route: "", motorOil: 0,  pumpPosition: 0 , stickMesaure: 0, redraw: false};
   
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.error == 0){
        toastr.success(msg.SUCCESS, msg.OPEN_WORKLOAD_SAVED);
        this.state = {registration: 0,  route: "", motorOil: 0,  pumpPosition: 0 , stickMesaure: 0};
        this.state.redraw = !this.state.redraw;
        this.props.cleanOpenWorkLoadJobIsDone();
        this.props.goToFuelling();
      }else if(nextProps.error > 1){
        toastr.error(msg.ERROR, msg.OPEN_WORKLOAD_NOT_SAVED);
      }
  }
  
  render() {
    const {state: {route, registration, motorOil, pumpPosition, stickMesaure}, 
           props: {registration_error, motorOil_error, 
                   pumpPosition_error, stickMesaure_error, pump_worker, jobIsDone}} = this;

    const  onOpenWorkload = (e) =>  {
      e.preventDefault()
      let data = {
        registration: this.state.registration,
        motorOil:     this.state.motorOil,
        pumpPosition: this.state.pumpPosition,
        stickMesaure: this.state.stickMesaure,
      }
      this.props.openWorkload(data);
    }

    const  onValidaRegistration = (e) =>  {
      e.preventDefault()
      if (!this.state.registration.trim()) {
        return
      }
      this.props.validateRegistration( this.state.registration )
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
              <Link type="button" id="proBtnAbrirJornada" className="btn btn-warning pro-btn-menu" to="/open/workload">
                <image className="icone_botoes" src="./assets/image/abrir.png" alt="icone_abastecimento" /><br />Abrir Jornada
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
                <h3>Abrir Jornada</h3>
              </div>
              <div className="pro-content">
                <form onSubmit= { onOpenWorkload }>
                  <div id="open-workload">
                    <div className="form-group">
                      <label htmlFor="pumpRegistrationStart"   className="col-form-label">Matrícula</label>
                      <input id="pumpRegistrationStart" className="form-control input" type="text" onChange={(e)=>this.setState({registration: e.target.value})}  
                             key={this.state.redraw} autofocus  onBlur={ onValidaRegistration }/>
                      <div id="pumpRegistrationStartErrorMessage" className="erroMessage">
                          { registration_error }
                      </div>
                      <div id="pumpRegistrationStartSuccessMessage" className="sucessMessage">
                        { pump_worker}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="motorOilStart" className="col-form-label">Óleo de Motor</label>
                      <input className="form-control input" type="text"  id="motorOilStart"  
                             key={this.state.redraw} onChange={(e)=>this.setState({motorOil: e.target.value})}/>
                      <div className="erroMessage">
                        { motorOil_error }
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="pumpPositionStart" className="col-form-label">Posição Registro Bomba</label>
                      <MaskedInput  mask={[/\d/,/\d/, /\d/, /\d/,/\d/, /\d/, /\d/,/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]} className="form-control input" type="text"
                            id="pumpPositionStart" onChange={(e)=>this.setState({pumpPosition: e.target.value})} key={this.state.redraw} />
                      <div className="erroMessage">
                        { pumpPosition_error }
                      </div>
                    </div>
                    <div className="form-group">
                      <label  htmlFor="stickMeasureStart" className="col-form-label">Medição Vara:</label>
                      <input className="form-control input" type="text"  id="stickMeasureStart" 
                             key={this.state.redraw} onChange={(e)=>this.setState({stickMesaure: e.target.value})} />
                      <div className="erroMessage">
                        { stickMesaure_error }
                      </div>
                    </div>
                    <div className="form-group">
                      <button type="submit" className="btn btn-warning pro-btn-submit" id="cadAbrirJornada">Abrir Jornada</button>
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

export default connect(  
  (state, ownProps) => ({ 
    registration_error:  state.openWorkload.registration_error,
    motorOil_error:      state.openWorkload.motorOil_error,
    pumpPosition_error:  state.openWorkload.pumpPosition_error,
    stickMesaure_error:  state.openWorkload.stickMesaure_error,
    pump_worker:         state.openWorkload.pump_worker,
    error:               state.openWorkload.error
  }),{
     openWorkload,
     validateRegistration,
     goToFuelling,
     cleanOpenWorkLoadJobIsDone
  })(OpenWorkload)