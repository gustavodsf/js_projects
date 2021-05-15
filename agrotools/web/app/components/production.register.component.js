"use strict";
import { Link }    from 'react-router';
import { connect } from 'react-redux';
import React       from 'react';
import { toastr } from 'react-redux-toastr';
import { saveProduction } from '../actions/index';


const constants = require('../constants/constants.types');

class ProductionRegister extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      production: '',
    };
  }

  componentWillReceiveProps(nextProps){
    if( typeof nextProps.successSave != 'undefined' && nextProps.successSave &&
       (typeof this.props.successSave == 'undefined' || !this.props.successSave)){
      toastr.success(constants.MSG_SUCCESS_SAVE_PRODUCTION);
      this.setState({ production:  ''});
    }

    // Failed to save
    if(typeof nextProps.saveErrorMessage != 'undefined' && nextProps.saveErrorMessage &&
       (typeof this.props.saveErrorMessage == 'undefined' || !this.props.saveErrorMessage)){
      toastr.error(constants.MSG_ERROR_SAVE_PRODUCTION + nextProps.saveErrorMessage);
    }
  }

  onChangeProduction(attributeName, attributeValue){
    this.setState({ production: attributeValue });
  }

  onSaveProduction() {
    console.log(this.state)
    if(this.isProductionOk(this.state.production)){
      let confirmation = confirm("Você tem certeza que deseja salvar as alterações realizadas?");
      if(confirmation){
        this.props.saveProduction(parseInt(this.state.production), this.props.authenticationToken);
      }
    }
  }

  isProductionOk(value) {
    if(value == '' || value == undefined){
      toastr.error(constants.MSG_ERROR_PRODUCTION_NOT_FILLED);
      return false;
    } else if(isNaN(value)){
      toastr.error(constants.MSG_ERROR_NOT_NUMBER);
      return false;
    } else if( parseFloat(value) < 0){
      toastr.error(constants.MSG_ERROR_NUMBER_MORE_THAN_ZERO);
      return false;
    }
    return true;
  }

  render() {
    return(
      <div id="container" className="col-sm-9 col-md-6">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <img id="menu-image-logo" src="./assets/image/milk_tool_icon.png" alt="logo"/>
              <span className="title-menu">{ constants.PROJECT_NAME }</span>
            </div>
            <ul className="nav navbar-nav">
              <li><Link to="/principal">{ constants.HOME }</Link></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  { constants.PRODUCTION } <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/production/list">{ constants.CATTLE_LIST }</Link></li>
                  <li><Link to="/production/register">{ constants.CATTLE_REGISTER }</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  { constants.CATTLE } <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><Link to="/cattle/list">{ constants.CATTLE_LIST }</Link></li>
                  <li><Link to="/cattle/register">{ constants.CATTLE_REGISTER }</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                  { constants.INPUT } <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">{ constants.CATTLE_LIST }</a></li>
                  <li><a href="#">{ constants.CATTLE_REGISTER }</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="register">
          <div className="pro-header-register">
            <div className="pro-header-title">
              <h3>{ constants.REGISTER_PRODUCTION }</h3>
            </div>
          </div>
          <div className="register-grid-1">
            <div className="form-group">
              <label htmlFor="cattle-name" className="col-form-label">{constants.DAILY_PRODUCTION}</label>
              <input
                id="cattle-name"
                type="text"
                className="form-control"
                name="production"
                onChange={(e) => this.onChangeProduction(e.target.name, e.target.value)}
                value={ this.state.production }
              />
            </div>
          </div>
          <div className="register-grid-2">
            <div className="pro-btn-cattle-register">
              <div className="pro-btn-container-cattle-register">
                <input type="button" className="btn btn-warning" onClick={this.onSaveProduction.bind(this)} value={constants.SAVE}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(  (state, ownProps) => ({
  authenticationToken: state.cattleRegister.authenticationToken,
  successSave: state.production.successSave,
  saveErrorMessage: state.production.saveErrorMessage
}),{
  saveProduction
})(ProductionRegister)
