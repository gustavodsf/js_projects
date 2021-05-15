"use strict";

import { connect } from 'react-redux';
import { Table, Column, Cell } from 'fixed-data-table';
import { Link } from 'react-router';
import React from 'react';
import update from 'immutability-helper';
import moment from 'moment';
import Select from 'react-select';

import {
  listWorkload,
  saveWorkload,
  deleteWorkload,
  generateFile,
  validateFile,
  loadRegionals,
  loadFuels,
  loadOils,
  loadTanks,
  loadPumps
} from '../actions/index';
import { WorkloadEdit } from './workload.edit.component';

class WorkloadList extends React.Component {
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      workloads: [],
      regionals: [],
      fuels: [],
      oils: [],
      tanks: [],
      pumps: [],
      filteredWorkloads: [],
      detailedWorkload: {},
      filter: {},
      unsavedChanges: false
    };

    this.props.listWorkload(this.props.authenticationToken);
    this.props.loadRegionals(this.props.authenticationToken);
    this.props.loadFuels(this.props.authenticationToken);
    this.props.loadOils(this.props.authenticationToken);
    this.props.loadTanks(this.props.authenticationToken);
    this.props.loadPumps(this.props.authenticationToken);
  }

  componentWillReceiveProps(nextProps) {
    // List workloads
    if(nextProps.hasLoaded && !this.props.hasLoaded) {
      this.setState({
        workloads: JSON.parse(JSON.stringify(nextProps.workloads)),
        filteredWorkloads: JSON.parse(JSON.stringify(nextProps.workloads)),
        detailedWorkload: nextProps.workloads.length > 0 ? JSON.parse(JSON.stringify(nextProps.workloads[0])) : {},
        filter: {},
        unsavedChanges: false
      });
    }

    // Failed to list
    if(typeof nextProps.listWorkloadsErrorMessage != 'undefined' && nextProps.listWorkloadsErrorMessage &&
       (typeof this.props.listWorkloadsErrorMessage == 'undefined' || !this.props.listWorkloadsErrorMessage)){
      alert("Erro ao listar as jornadas: " + nextProps.listWorkloadsErrorMessage);
    }

    // Load regionals
    if(nextProps.successLoadRegionals && !this.props.successLoadRegionals) {
      this.setState({
        regionals: JSON.parse(JSON.stringify(nextProps.regionals))
      });
    }

    // Failed to load regionals
    if(typeof nextProps.loadRegionalsErrorMessage != 'undefined' && nextProps.loadRegionalsErrorMessage &&
       (typeof this.props.loadRegionalsErrorMessage == 'undefined' || !this.props.loadRegionalsErrorMessage)){
      alert("Erro ao listar as regionais: " + nextProps.loadRegionalsErrorMessage);
    }

    // Load fuels
    if(nextProps.successLoadFuels && !this.props.successLoadFuels) {
      this.setState({
        fuels: JSON.parse(JSON.stringify(nextProps.fuels))
      });
    }

    // Failed to load fuels
    if(typeof nextProps.loadFuelsErrorMessage != 'undefined' && nextProps.loadFuelsErrorMessage &&
       (typeof this.props.loadFuelsErrorMessage == 'undefined' || !this.props.loadFuelsErrorMessage)){
      alert("Erro ao listar os tipos de combustível: " + nextProps.loadFuelsErrorMessage);
    }

    // Load oils
    if(nextProps.successLoadOils && !this.props.successLoadOils) {
      this.setState({
        oils: JSON.parse(JSON.stringify(nextProps.oils))
      });
    }

    // Failed to load oils
    if(typeof nextProps.loadOilsErrorMessage != 'undefined' && nextProps.loadOilsErrorMessage &&
       (typeof this.props.loadOilsErrorMessage == 'undefined' || !this.props.loadOilsErrorMessage)){
      alert("Erro ao listar os tipos de óleo: " + nextProps.loadOilsErrorMessage);
    }

    // Load tanks
    if(nextProps.successLoadTanks && !this.props.successLoadTanks) {
      this.setState({
        tanks: JSON.parse(JSON.stringify(nextProps.tanks))
      });
    }

    // Failed to load tanks
    if(typeof nextProps.loadTanksErrorMessage != 'undefined' && nextProps.loadTanksErrorMessage &&
       (typeof this.props.loadTanksErrorMessage == 'undefined' || !this.props.loadTanksErrorMessage)){
      alert("Erro ao listar os tanques: " + nextProps.loadTanksErrorMessage);
    }

    // Load pumps
    if(nextProps.successLoadPumps && !this.props.successLoadPumps) {
      this.setState({
        pumps: JSON.parse(JSON.stringify(nextProps.pumps))
      });
    }

    // Failed to load pumps
    if(typeof nextProps.loadPumpsErrorMessage != 'undefined' && nextProps.loadPumpsErrorMessage &&
       (typeof this.props.loadPumpsErrorMessage == 'undefined' || !this.props.loadPumpsErrorMessage)){
      alert("Erro ao listar as bombas: " + nextProps.loadPumpsErrorMessage);
    }

    // Successfully saved
    if(typeof nextProps.successSave != 'undefined' && nextProps.successSave &&
       (typeof this.props.successSave == 'undefined' || !this.props.successSave)){
      // Reload the workloads
      this.props.listWorkload(this.props.authenticationToken);

      alert("A jornada foi salva com sucesso!");
    }

    // Failed to save
    if(typeof nextProps.saveWorkloadsErrorMessage != 'undefined' && nextProps.saveWorkloadsErrorMessage &&
       (typeof this.props.saveWorkloadsErrorMessage == 'undefined' || !this.props.saveWorkloadsErrorMessage)){
      alert("Erro ao salvar jornada: " + nextProps.saveWorkloadsErrorMessage);
    }

    // Successfully deleted
    if(typeof nextProps.successDelete != 'undefined' && nextProps.successDelete &&
       (typeof this.props.successDelete == 'undefined' || !this.props.successDelete)){
      // Reload the workloads
      this.props.listWorkload(this.props.authenticationToken);

      alert("A jornada foi removida com sucesso!");
    }

    // Failed to delete
    if(typeof nextProps.deleteWorkloadsErrorMessage != 'undefined' && nextProps.deleteWorkloadsErrorMessage &&
       (typeof this.props.deleteWorkloadsErrorMessage == 'undefined' || !this.props.deleteWorkloadsErrorMessage)){
      alert("Erro ao remover jornada: " + nextProps.deleteWorkloadsErrorMessage);
    }

    // Failed to generate the file
    if(typeof nextProps.generateFileErrorMessage != 'undefined' && nextProps.generateFileErrorMessage &&
       (typeof this.props.generateFileErrorMessage == 'undefined' || !this.props.generateFileErrorMessage)){
      alert("Erro ao gerar o arquivo: " + nextProps.generateFileErrorMessage);
    }

    // Successfully validated the file
    if(typeof nextProps.successValidateFile != 'undefined' && nextProps.successValidateFile &&
       (typeof this.props.successValidateFile == 'undefined' || !this.props.successValidateFile)){
      // Reload the workloads
      this.props.listWorkload(this.props.authenticationToken);

      alert("O arquivo foi validado com sucesso!");
    }

    // Failed to validate the file
    if(typeof nextProps.validateFileErrorMessage != 'undefined' && nextProps.validateFileErrorMessage &&
       (typeof this.props.validateFileErrorMessage == 'undefined' || !this.props.validateFileErrorMessage)){
      alert("Erro ao validar arquivo: " + nextProps.validateFileErrorMessage);
    }
  }

  onCreateOil(){
    // Add an empty object into the oil array
    let newDetailedWorkload = update(this.state.detailedWorkload, {
      oil: {$push: [
        {
          garage: this.state.regionals[0].code,
          fuel_type: this.state.oils[0].code,
          tank: this.state.tanks[0].code,
          pump: this.state.pumps[0].code
        }
      ]}
    });

    // Update the state
    this.setState({
      detailedWorkload: newDetailedWorkload,
      unsavedChanges: true
    });
  }

  onCreateRefuel(){
    // Add an empty object into the refuel array
    let newDetailedWorkload = update(this.state.detailedWorkload, {
      refuel: {$push: [
        {
          garage: this.state.regionals[0].code,
          fuel_type: this.state.fuels[0].code,
          tank: this.state.tanks[0].code,
          pump: this.state.pumps[0].code
        }
      ]}
    });

    // Update the state
    this.setState({
      detailedWorkload: newDetailedWorkload,
      unsavedChanges: true
    });
  }

  onChangeOil(attribute,oilIndex){
    // Get the name of the attribute
    let attributeName = Object.keys(attribute)[0];
    let attributeValue = attribute[attributeName];

    if(attributeName == 'time'){
      // Apply the ISO-8601 format
      attributeValue = moment.utc(attributeValue).toISOString();
    } else if(attributeName == 'amount' || attributeName == 'bus_number'){
      // Convert to number (Inline only works with text)
      attributeValue = Number(attributeValue);
    }

    let newDetailedWorkload = update(this.state.detailedWorkload,{
      oil:{
        [oilIndex]:{
          [attributeName]: {$set: attributeValue}
        }
      }
    });

    // Update state
    this.setState({
      detailedWorkload: newDetailedWorkload,
      unsavedChanges: true
    });
  }

  onChangeRefuel(attribute,refuelIndex){
    // Get the name of the attribute
    let attributeName = Object.keys(attribute)[0];
    let attributeValue = attribute[attributeName];

    if(attributeName == 'time'){
      // Apply the ISO-8601 format
      attributeValue = moment.utc(attributeValue).toISOString();
    } else if(attributeName == 'fuel' || attributeName == 'odometer' ||
              attributeName == 'driver_registration' || attributeName == 'bus_number'){
      // Convert to number (Inline only works with text)
      attributeValue = Number(attributeValue);
    }

    let newDetailedWorkload = update(this.state.detailedWorkload,{
      refuel:{
        [refuelIndex]:{
          [attributeName]: {$set: attributeValue}
        }
      }
    });

    // Update state
    this.setState({
      detailedWorkload: newDetailedWorkload,
      unsavedChanges: true
    });
  }

  onDeleteOil(oilIndex){
    let confirmation = confirm("Você tem certeza que deseja remover o óleo?");

    if (confirmation) {
      // Remove oil from the detailed workload
      if(oilIndex > -1){
        let newDetailedWorkload = update(this.state.detailedWorkload,{
          oil: {$splice: [[oilIndex, 1]]}
        });

        // Update state
        this.setState({
          detailedWorkload: newDetailedWorkload,
          unsavedChanges: true
        });
      }
    }
  }

  onDeleteRefuel(refuelIndex){
    let confirmation = confirm("Você tem certeza que deseja remover o abastecimento?");

    if (confirmation) {
      // Remove refuel from the detailed workload
      if(refuelIndex > -1){
        let newDetailedWorkload = update(this.state.detailedWorkload,{
          refuel: {$splice: [[refuelIndex, 1]]}
        });

        // Update state
        this.setState({
          detailedWorkload: newDetailedWorkload,
          unsavedChanges: true
        });
      }
    }
  }

  onChangeWorkload(attributeName, attributeValue, field){
    let newDetailedWorkload = update(this.state.detailedWorkload,{
      [field]:{
        [attributeName]: {$set: attributeValue}
      }
    });
    this.setState({
      detailedWorkload: newDetailedWorkload
    });
  }

  onCreateWorkload(){
    // Check unsaved changes on the current workload
    if(this.state.unsavedChanges){
      let confirmation = confirm("Existem alterações não salvas. Deseja descartar as alterações e criar uma nova jornada?");

      if(!confirmation){
        return;
      }
    }

    this.setState({
      detailedWorkload: {
        open: {},
        close: {},
        refuel: [],
        oil: []
      },
      unsavedChanges: true
    });
  }

  onUndoWorkloadChanges(){
    let confirmation = confirm("Você tem certeza que deseja descartar as alterações realizadas na jornada?");

    if(confirmation){
      // Get workload's ID
      let workloadId = this.state.detailedWorkload._id;

      // Call onDetailWorkload method after set unsavedChanges to false
      this.setState({
        unsavedChanges: false
      }, () => {
        this.onDetailWorkload(workloadId);
      });
    }
  }

  onSaveWorkload(){
    let confirmation = confirm("Você tem certeza que deseja salvar as alterações realizadas na jornada?");

    if(confirmation){
      this.props.saveWorkload(this.state.detailedWorkload, this.props.authenticationToken);
    }
  }

  onDeleteWorkload(workloadId){
    let confirmation = confirm("Você tem certeza que deseja remover a jornada?");

    if (confirmation){
      this.props.deleteWorkload(workloadId, this.props.authenticationToken);
    }
  }

  onDetailWorkload(workloadId){
    // Check unsaved changes on the current workload
    if(this.state.unsavedChanges){
      let confirmation = confirm("Existem alterações não salvas. Deseja descartar as alterações e carregar a jornada?");

      if(!confirmation){
        return;
      }
    }

    // Get index of the workload on the filtered list
    let filteredWorkloadIndex = this.state.filteredWorkloads.map((e) => { return e._id; }).indexOf(workloadId);

    // Set the workload that should be detailed
    let newDetailedWorkload = JSON.parse(JSON.stringify(this.state.filteredWorkloads[filteredWorkloadIndex]));
    this.setState({
      detailedWorkload: newDetailedWorkload,
      unsavedChanges: false
    });
  }

  onChangeFilter(attributeName, attributeValue){
    // Update the filter field
    let newFilter = update(this.state.filter,{
      [attributeName]: {$set: attributeValue}
    });

    // Update the state and callback the filter function
    this.setState({
      filter: newFilter
    },
      this.onFilterWorkload.bind(this)
    );
  }

  onFilterWorkload() {
    // Filter the workloads
    let newFilteredWorkloads = this.state.workloads.filter((workload) => {
      // Filter by date
      if (typeof this.state.filter.date != 'undefined' && this.state.filter.date.trim() != ''){
        let filterDate = new Date(this.state.filter.date);
        let workloadDate = new Date(workload.open.date);

        // UTC method is used here to get date that was set by the user, ignoring the timezone
        if (filterDate.getUTCFullYear() != workloadDate.getFullYear() ||
            filterDate.getUTCMonth() != workloadDate.getMonth() ||
            filterDate.getUTCDate() != workloadDate.getDate()){
          return false;
        }
      }

      // Filter by registration
      if (typeof this.state.filter.registration != 'undefined' && this.state.filter.registration.trim() != ''){
        if (!workload.open.registration.toString().startsWith(this.state.filter.registration.trim())){
          return false;
        }
      }

      // Filter by regional
      if (typeof this.state.filter.regional != 'undefined' && this.state.filter.regional.trim() != ''){
        if (this.state.filter.regional.trim() != workload.refuel[0].garage.toString()){
          return false;
        }
      }

      return true;
    });

    // Update the state
    this.setState({
      filteredWorkloads: JSON.parse(JSON.stringify(newFilteredWorkloads))
    });
  }

  onGenerateFile(){
    let confirmation = this.state.unsavedChanges ? confirm("Existem altações que não foram salvas e serão perdidas caso você prossiga. Deseja gerar o arquivo com os abastecimentos?") : confirm("Você deseja gerar o arquivo com os abastecimentos?");

    if(confirmation){
      this.props.generateFile(this.props.authenticationToken);
    }
  }

  onValidateFile(){
    let confirmation = this.state.unsavedChanges ? confirm("Existem altações que não foram salvas e serão perdidas caso você prossiga. Deseja validar o arquivo gerado? Ao fazer isso não será mais possível editar os abastecimentos atuais.") : confirm("Deseja validar o arquivo gerado? Ao fazer isso não será mais possível editar os abastecimentos atuais.");

    if(confirmation){
      this.props.validateFile(this.props.authenticationToken);
    }
  }

  render() {
    return(    <div id="container" className="col-sm-9 col-md-6">
      <div id="header">
        <img id="montagemImagem" src="./assets/image/Montagem-Foto-Site-Progresso_web.jpg" alt="montagem_progresso"/>
      </div>

      <div className="btn-group-vertical pro-menu">
        <Link type="button" id="proBtnListJornadas" className="pro-link-menu btn btn-warning pro-btn-menu" to="/workload/list" name="proBtnListJornadas">
            <img className="icone_botoes" src="./assets/image/list.png" alt="icone_abastecimento"/>
            <br/>
            <span className="pro-link-menu-txt">Jornadas</span>
        </Link>
        <Link type="button" id="proBtnUpload" className="btn btn-warning pro-btn-menu" to="/upload/file" name="proBtnUpload">
          <img className="icone_botoes" src="./assets/image/upload.png" alt="icone_abastecimento" />
          <br/>
          <span className="pro-link-menu-txt">Enviar Arquivos</span>
        </Link>
      </div>
      <form className="form_interface">
        <div className="page-header">
          <div className="pro-header-title">
            <h3>Jornadas</h3>
						<a onClick={this.onCreateWorkload.bind(this)} title="Criar Jornada" className="pro-create-workload">
						<i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
					</a>
          </div>
				</div>
				<div className="pro-workload-container">
					<div className="pro-table-workload">
						<Table
							rowHeight={30}
							rowsCount={this.state.filteredWorkloads.length}
							headerHeight={30}
							width={550}
							maxHeight={400}
						>
							<Column
								header={<Cell>Data</Cell>}
								cell={props => (
									<Cell width={100}>
										{moment(this.state.filteredWorkloads[props.rowIndex].open.date.split('.')[0]).format('DD/MM/YYYY')}
									</Cell>
								)}
								width={100}
								align={'center'}
							/>
							<Column
								header={<Cell>Horário da jornada</Cell>}
								cell={props => (
									<Cell width={150}>
										{moment(this.state.filteredWorkloads[props.rowIndex].open.date.split('.')[0]).format('HH:mm') + ' - ' + moment(this.state.filteredWorkloads[props.rowIndex].close.date.split('.')[0]).format('HH:mm')}
									</Cell>
								)}
								width={150}
								align={'center'}
							/>
							<Column
								header={<Cell>Regional</Cell>}
								cell={props => (
									<Cell width={100}>
										{this.state.filteredWorkloads[props.rowIndex].refuel.length > 0 ? this.state.filteredWorkloads[props.rowIndex].refuel[0].garage : ''}
									</Cell>
								)}
								width={100}
								align={'center'}
							/>
							<Column
								header={<Cell>Bombeiro</Cell>}
								cell={props => (
									<Cell width={100}>
										{this.state.filteredWorkloads[props.rowIndex].open.registration}
									</Cell>
								)}
								width={100}
								align={'center'}
							/>
							<Column
								cell={props => (
									<Cell width={70}>
										<a title="Carregar Abastecimentos" onClick={this.onDetailWorkload.bind(this,this.state.filteredWorkloads[props.rowIndex]._id)} className="pro-link-left">
											<i className="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i>
										</a>
										<a title="Remover Jornada" onClick={this.onDeleteWorkload.bind(this,this.state.filteredWorkloads[props.rowIndex]._id)} className="pro-link-right" >
											<i className="fa fa-times fa-1x" aria-hidden="true"></i>
										</a>
									</Cell>
								)}
								width={80}
							/>
						</Table>
					</div>
					<div className="pro-filter-workload">
						<div className="pro-page-second-header">
							<span className="pro-header-second-title">
								Filtros
							</span>
						</div>
						<div className="pro-filter-fields">
							<div className="form-group">
								<label htmlFor="filter-date" className="col-form-label">Data</label>
								<input
									id="filter-date"
									type="date"
									className="form-control"
									name="date"
									onChange={(e) => this.onChangeFilter(e.target.name, e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="filter-pump-worker-registration" className="col-form-label">Matrícula do Bombeiro</label>
								<input
									id="filter-pump-worker-registration"
									type="text"
									className="form-control"
									name="registration"
									onChange={(e) => this.onChangeFilter(e.target.name, e.target.value)}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="filter-regional" className="col-form-label">Regional</label>
								<Select
									id="filter-regional"
                  value={typeof this.state.filter.regional != 'undefined' ? this.state.filter.regional : ''}
                  clearable={true}
                  options={this.state.regionals.map(function(regional) {
                    return {
                      value: regional.code,
                      label: regional.code + ' - ' + regional.name
                    }
                  })}
									onChange={(e) => this.onChangeFilter('regional', e != null ? e.value : '')}
								/>
							</div>
						</div>
					</div>
				</div>
				<WorkloadEdit
						workload={this.state.detailedWorkload}
            regionals={this.state.regionals}
            fuels={this.state.fuels}
            oils={this.state.oils}
            tanks={this.state.tanks}
            pumps={this.state.pumps}
						onSaveWorkload={this.onSaveWorkload.bind(this)}
						onUndoWorkloadChanges={this.onUndoWorkloadChanges.bind(this)}
            onGenerateFile={this.onGenerateFile.bind(this)}
            onValidateFile={this.onValidateFile.bind(this)}
						onChangeWorkload={this.onChangeWorkload.bind(this)}
						onChangeRefuel={this.onChangeRefuel.bind(this)}
						onDeleteRefuel={this.onDeleteRefuel.bind(this)}
						onCreateRefuel={this.onCreateRefuel.bind(this)}
						onChangeOil={this.onChangeOil.bind(this)}
						onDeleteOil={this.onDeleteOil.bind(this)}
						onCreateOil={this.onCreateOil.bind(this)}
				/>
			</form>
      <div id="footer" className="footer_interface">
        <div id="text">
          <span className="matriz" >
            Via&ccedil;&atilde;o Progresso<br />
            <span className="end">
              Avenida Condessa do Rio Novo, 881 - Centro CEP: 25803-000<br />
              Matriz Tr&ecirc;s Rios/RJ (24) 2251-5050
            </span>
          </span>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    authenticationToken: state.workloadList.authenticationToken,
    workloads: state.workloadList.workloads,
    hasLoaded: state.workloadList.hasLoaded,
    listWorkloadsErrorMessage: state.workloadList.listWorkloadsErrorMessage,
    regionals: state.workloadList.regionals,
    successLoadRegionals: state.workloadList.successLoadRegionals,
    loadRegionalsErrorMessage: state.workloadList.loadRegionalsErrorMessage,
    fuels: state.workloadList.fuels,
    successLoadFuels: state.workloadList.successLoadFuels,
    loadFuelsErrorMessage: state.workloadList.loadFuelsErrorMessage,
    oils: state.workloadList.oils,
    successLoadOils: state.workloadList.successLoadOils,
    loadOilsErrorMessage: state.workloadList.loadOilsErrorMessage,
    tanks: state.workloadList.tanks,
    successLoadTanks: state.workloadList.successLoadTanks,
    loadTanksErrorMessage: state.workloadList.loadTanksErrorMessage,
    pumps: state.workloadList.pumps,
    successLoadPumps: state.workloadList.successLoadPumps,
    loadPumpsErrorMessage: state.workloadList.loadPumpsErrorMessage,
    successSave: state.workloadList.successSave,
    saveWorkloadsErrorMessage: state.workloadList.saveWorkloadsErrorMessage,
    successDelete: state.workloadList.successDelete,
    deleteWorkloadsErrorMessage: state.workloadList.deleteWorkloadsErrorMessage,
    successGenerateFile: state.workloadList.successGenerateFile,
    generateFileErrorMessage: state.workloadList.generateFileErrorMessage,
    successValidateFile: state.workloadList.successValidateFile,
    validateFileErrorMessage: state.workloadList.validateFileErrorMessage
  }),{
    listWorkload,
    loadRegionals,
    loadFuels,
    loadOils,
    loadTanks,
    loadPumps,
    saveWorkload,
    deleteWorkload,
    generateFile,
    validateFile
  })(WorkloadList)
