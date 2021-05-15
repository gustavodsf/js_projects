"use strict";
import { bindActionCreators }          from 'redux';
import { cleanCloseWorkLoadJobIsDone } from '../actions/index';
import { closeWorkload }               from '../actions/index';
import { gotoOpenWorkload }            from '../actions/index';
import { Component }                   from 'react';
import { connect }                     from 'react-redux';
import { Link }                        from 'react-router';
import React                           from 'react';
import { sendWorkloadServer }          from '../actions/index';
import { updateFleet }                 from '../actions/index';
import { updateEmployee }              from '../actions/index';
import { toastr }                      from 'react-redux-toastr';
import { MaskedInput }                from 'react-text-mask';
import * as msg                        from '../shared/msg.types';

class CloseWorkload extends Component {
  constructor(props) {
    super(props)
    this.state = { route: "", redraw: false};
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.error == 0){
        toastr.success(msg.SUCCESS, msg.CLOSE_WORKLOAD_SAVED);
        this.state = {motorOil: 0, pumpPosition: 0, stickMesaure: 0};
        this.state.redraw = !this.state.redraw;
        this.props.sendWorkloadServer();
        this.props.cleanCloseWorkLoadJobIsDone();
        this.props.gotoOpenWorkload();
        this.props.updateFleet();
        this.props.updateEmployee();
      }else if(nextProps.error > 1){
        toastr.error(msg.ERROR, msg.CLOSE_WORKLOAD_NOT_SAVED);
      }
  }
  
  render() {
    const {state: {route, motorOil, pumpPosition, stickMesaure}, props:{router, jobIsDone}} = this;
    const  onCloseWorkload = (e) =>  {
      e.preventDefault();
      let data = {
        motorOil:     this.state.motorOil,
        pumpPosition: this.state.pumpPosition,
        stickMesaure: this.state.stickMesaure
      }
      this.props.closeWorkload(data);
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
                <h3>Encerrar Jornada</h3>
              </div>
              <div className="pro-content">
                 <form onSubmit= { onCloseWorkload }>
                  <div id="encerrar-jornada" >
                    <div className="form-group">
                      <label id="oleoMotorFimLabel" htmlFor="oleoMotorFim" className="col-form-label">Óleo de Motor</label>
                      <input className="form-control input" type="text"  id="oleoMotorFim" 
                             key={this.state.redraw} onChange={(e)=>this.setState({motorOil: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label id="posicaoRegistroBombaFimLabel" htmlFor="posicaoRegistroBombaFim" className="col-form-label">Posição Registro Bomba</label>
                      <MaskedInput  mask={[/\d/,/\d/, /\d/, /\d/,/\d/, /\d/, /\d/,/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/]} className="form-control input" type="text"  
                            id="posicaoRegistroBombaFim" key={this.state.redraw} onChange={(e)=>this.setState({pumpPosition: e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label id="medicaoVaraFimLabel" htmlFor="medicaoVaraFim" className="col-form-label">Medição Vara nos Tanques</label>
                      <input className="form-control input" type="text"  id="medicaoVaraFim" 
                             key={this.state.redraw} onChange={(e)=>this.setState({stickMesaure: e.target.value})} />
                    </div>
                    <div className="form-group">
                      <button type="sumit" className="btn btn-warning" id="cadEncerrarJornada">Encerrar Jornada</button>
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
  error: state.close.error,
}),{ 
  closeWorkload,
  cleanCloseWorkLoadJobIsDone,
  gotoOpenWorkload,
  sendWorkloadServer,
  updateFleet,
  updateEmployee
})(CloseWorkload)