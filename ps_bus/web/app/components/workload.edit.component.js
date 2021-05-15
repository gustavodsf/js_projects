"use strict";

import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import Datetime from 'react-datetime';
import React from 'react';
import moment from 'moment';

import { filterWorkload } from '../actions/index';
import { RefuelList } from './refuel.list.component';
import { OilList } from './oil.list.component';

export class WorkloadEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="pro-workload-edit">
        <div className="pro-header-workload-edit">
          <div className="pro-page-second-header">
            <span className="pro-header-second-title">
              Informações da Jornada
            </span>
          </div>
        </div>
        <div className="pro-open-workload-edit">
          <div className="pro-page-second-header">
            <span className="pro-header-second-title">
              Abertura da Jornada
            </span>
          </div>
          <div className="pro-open-workload">
            <div className="form-group">
              <label htmlFor="open-date-time" className="col-form-label">Data-Hora</label>
              <Datetime
                id="open-date-time"
                locale="pt_BR"
                utc={true}
                onChange={(e) => this.props.onChangeWorkload("date", e._d, "open")}
                value={typeof this.props.workload.open != 'undefined' && typeof this.props.workload.open.date != 'undefined' ? moment(this.props.workload.open.date) : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="open-pump-worker-registration" className="col-form-label">Matrícula do Bombeiro</label>
              <input
                id="open-pump-worker-registration"
                type="number"
                className="form-control"
                name="registration"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "open")}
                value={typeof this.props.workload.open != 'undefined' && typeof this.props.workload.open.registration != 'undefined' ? this.props.workload.open.registration : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="open-oil-motor" className="col-form-label">Óleo de Motor (L)</label>
              <input
                id="open-oil-motor"
                type="number"
                className="form-control"
                name="motor_oil"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "open")}
                value={typeof this.props.workload.open != 'undefined' && typeof this.props.workload.open.motor_oil != 'undefined' ? this.props.workload.open.motor_oil : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="open-pump-position" className="col-form-label">Posição Registro Bomba (L)</label>
              <input
                id="open-pump-position"
                type="number"
                className="form-control"
                name="pump_position"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "open")}
                value={typeof this.props.workload.open != 'undefined' && typeof this.props.workload.open.pump_position != 'undefined' ? this.props.workload.open.pump_position : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="open-workload-stick-meseaure" className="col-form-label">Medição Vara (m)</label>
              <input
                id="open-workload-stick-meseaure"
                className="form-control"
                type="number"
                name="stick_mesaure"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "open")}
                value={typeof this.props.workload.open != 'undefined' && typeof this.props.workload.open.stick_mesaure != 'undefined' ? this.props.workload.open.stick_mesaure : ''}
              />
            </div>
          </div>
        </div>
        <div className="pro-close-workload-edit">
          <div className="pro-page-second-header">
            <span className="pro-header-second-title">
              Encerramento da Jornada
            </span>
          </div>
          <div className="pro-close-workload">
            <div className="form-group">
              <label htmlFor="close-date-time" className="col-form-label">Data-Hora</label>
              <Datetime
                id="close-date-time"
                locale="pt_BR"
                utc={true}
                onChange={(e) => this.props.onChangeWorkload("date", e._d, "close")}
                value={typeof this.props.workload.close != 'undefined' && typeof this.props.workload.close.date != 'undefined' ? moment(this.props.workload.close.date) : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="close-motor-oil" className="col-form-label">Óleo de Motor (L)</label>
              <input
                id="close-motor-oil"
                type="number"
                name="motor_oil"
                className="form-control"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "close")}
                value={typeof this.props.workload.close != 'undefined' && typeof this.props.workload.close.motor_oil != 'undefined' ? this.props.workload.close.motor_oil : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="close-pump-position" className="col-form-label">Posição Registro Bomba (L)</label>
              <input
                id="close-pump-position"
                type="number"
                name="pump_position"
                className="form-control"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "close")}
                value={typeof this.props.workload.close != 'undefined' && typeof this.props.workload.close.pump_position != 'undefined' ? this.props.workload.close.pump_position : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="close-stick-meseaure" className="col-form-label">Medição Vara (m)</label>
              <input
                id="close-stick-meseaure"
                type="number"
                name="stick_mesaure"
                className="form-control"
                onChange={(e) => this.props.onChangeWorkload(e.target.name, e.target.value, "close")}
                value={typeof this.props.workload.close != 'undefined' && typeof this.props.workload.close.stick_mesaure != 'undefined' ? this.props.workload.close.stick_mesaure : ''}
              />
            </div>
          </div>
        </div>
        <div className="pro-refuel-workload-edit">
          <div className="pro-page-second-header">
            <span className="pro-header-second-title">
              Abastecimento
            </span>
            <a title="Adicionar Abastecimento" className="pro-create-refuel">
							<i onClick={this.props.onCreateRefuel} className="fa fa-plus-circle fa-1x" aria-hidden="true"></i>
						</a>
          </div>
          <RefuelList
            refuel={Object.keys(this.props.workload).length !== 0 || this.props.workload.constructor !== Object ? this.props.workload.refuel : []}
            regionals={this.props.regionals}
            fuels={this.props.fuels}
            tanks={this.props.tanks}
            pumps={this.props.pumps}
            onChangeRefuel={this.props.onChangeRefuel}
            onDeleteRefuel={this.props.onDeleteRefuel}
            onCreateRefuel={this.props.onCreateRefuel}
          />
        </div>
        <div className="pro-oil-workload-edit">
          <div className="pro-page-second-header">
            <span className="pro-header-second-title">
              Óleo Motor
            </span>
            <a title="Adicionar óleo" className="pro-create-oill" >
							<i onClick={this.props.onCreateOil} className="fa fa-plus-circle fa-1x" aria-hidden="true"></i>
						</a>
          </div>
          <OilList
            oil={Object.keys(this.props.workload).length !== 0 || this.props.workload.constructor !== Object ? this.props.workload.oil : []}
            regionals={this.props.regionals}
            oils={this.props.oils}
            tanks={this.props.tanks}
            pumps={this.props.pumps}
            onChangeOil={this.props.onChangeOil}
            onDeleteOil={this.props.onDeleteOil}
            onCreateOil={this.props.onCreateOil}
          />
        </div>
        <div className="pro-btn-workload-edit">
          <div className="pro-page-second-header"></div>
          <div className="pro-btn-container-workload-edit">
            <input type="button" className="btn btn-warning" onClick={this.props.onSaveWorkload} value="Salvar Jornada"/>
            <input type="button" className="btn btn-warning" onClick={this.props.onUndoWorkloadChanges} value="Desfazer alterações"/>
            <input type="button" className="btn btn-danger" onClick={this.props.onGenerateFile} value="Gerar Arquivo"/>
            <input type="button" className="btn btn-primary" onClick={this.props.onValidateFile} value="Validar Arquivo"/>
          </div>
        </div>
      </div>
    );
  }
}
