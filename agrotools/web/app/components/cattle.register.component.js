"use strict";

import { connect }    from 'react-redux';
import React          from 'react';
import update         from 'immutability-helper';
import { saveCattle, selectCattle } from '../actions/index';
import { Link }       from 'react-router';
import { SendFile } from './send.file.component';
import { toastr } from 'react-redux-toastr';
import Datetime from 'react-datetime';
import moment from 'moment';

const constants = require('../constants/constants.types');

class CattleRegister extends React.Component {

  constructor(props) {
    super(props);

    if(typeof this.props.params.cattleId == 'undefined'){
      this.state = {
        cattle: {
          status: 'presente',
          photos: []
        },
        counter: 0
      };
    }else{
      let id = this.props.params.cattleId;
      let cattle = this.props.cattleList.find(function(cattle){
        return cattle._id == id;
      });

      this.state = {
        cattle: cattle,
        counter: cattle.photos.length
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    // Successfully saved
    if(typeof nextProps.successSave != 'undefined' && nextProps.successSave &&
       (typeof this.props.successSave == 'undefined' || !this.props.successSave)){
      toastr.success(constants.MSG_SUCCESS_SAVE_CATTLE);
      this.setState({
        cattle: {
          status: 'presente',
          photos: []
        },
        counter: 0
      });
    }

    // Failed to save
    if(typeof nextProps.saveErrorMessage != 'undefined' && nextProps.saveErrorMessage &&
       (typeof this.props.saveErrorMessage == 'undefined' || !this.props.saveErrorMessage)){
      toastr.error(constants.MSG_ERROR_SAVE_CATTLE + nextProps.saveErrorMessage);
    }
  }

  onChangeCattle(attributeName, attributeValue){
    let newCattle = update(this.state.cattle,{
      [attributeName]: {$set: attributeValue}
    });
    this.setState({
      cattle: newCattle
    });
  }

  onSaveCattle() {
    let confirmation = confirm("Você tem certeza que deseja salvar as alterações realizadas?");
    if(confirmation){
      // Set birthday to ISOString
      let newCattle = update(this.state.cattle,{
        birthday: {$set: moment.utc(this.state.cattle.birthday).toISOString()}
      });
      this.setState({
        cattle: newCattle
      });

      // Call the save function
      this.props.saveCattle(this.state.cattle, this.props.authenticationToken);
    }
  }

  onUploadImage(imgJson){
    imgJson["idx"] = this.state.counter;
    let newCattle = update(this.state.cattle, {photos: {$push: [imgJson]}});
    this.setState({ cattle:  newCattle });
    this.setState({ counter:  this.state.counter + 1});
  }

  onDeleteImage(idx){
    let newImages = [];
    let aux = 0;
    for(let i = 0; i < this.state.cattle.photos.length ; i++ ){
      if( i != idx){
        let img =  this.state.cattle.photos[i];
        img['idx'] = aux;
        console.log(img);
        newImages.push(img);
        aux = aux + 1;
      }else{
        this.setState({ counter:  this.state.counter - 1});
      }
    }
    let newCattle = update(this.state.cattle, {
      photos: {$set: newImages}
    });
    this.setState({ cattle:  newCattle });
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
              <h3>{ constants.REGISTER_CATTLE }</h3>
            </div>
          </div>
          <div className="register-grid-1">
            <div className="form-group">
              <label htmlFor="cattle-name" className="col-form-label">{constants.NAME}</label>
              <input
                id="cattle-name"
                type="text"
                className="form-control"
                name="name"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.name != 'undefined' ? this.state.cattle.name : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-gender" className="col-form-label">{constants.GENRE}</label>
              <select
                id="cattle-gender"
                type="text"
                className="form-control"
                name="gender"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.gender != 'undefined' ? this.state.cattle.gender : 'choosed'}
              >
                <option disabled value="choosed">{constants.CHOOSE_ONE}</option>
                <option value="male">{constants.MALE}</option>
                <option value="female">{constants.FEMALE}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cattle-coat" className="col-form-label">{constants.COAT}</label>
              <input
                id="cattle-coat"
                type="text"
                className="form-control"
                name="coat"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.coat != 'undefined' ? this.state.cattle.coat : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-rgd" className="col-form-label">{constants.RGD}</label>
              <input
                id="cattle-rgd"
                type="text"
                className="form-control"
                name="RGD"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.RGD != 'undefined' ? this.state.cattle.RGD : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-father-id" className="col-form-label">{constants.FATHER}</label>
              <input
                id="cattle-father-id"
                type="text"
                className="form-control"
                name="father_id"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.father_id != 'undefined' ? this.state.cattle.father_id : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-breed" className="col-form-label">{constants.BREED}</label>
              <select
                id="cattle-breed"
                className="form-control"
                name="breed"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.breed != 'undefined' ? this.state.cattle.breed : 'choosed'}
              >
                <option disabled value="choosed">{constants.CHOOSE_ONE}</option>
                <option value="HOLANDESA">{constants.HOLANDESA}</option>
                <option value="JERSEY">{constants.JERSEY}</option>
                <option value="PARDO_SUICA">{constants.PARDO_SUICA}</option>
                <option value="GIROLANDO">{constants.GIROLANDO}</option>
                <option value="GIR_LEITEIRO">{constants.GIR_LEITEIRO}</option>
                <option value="PINZGUAER">{constants.PINZGUAER}</option>
                <option value="SIMENTAL">{constants.SIMENTAL}</option>
                <option value="RED_POLLED">{constants.RED_POLLED}</option>
                <option value="CARACU">{constants.CARACU}</option>
                <option value="PITANGUEIRAS">{constants.PITANGUEIRAS}</option>
                <option value="NORMANDO">{constants.NORMANDO}</option>
                <option value="GUERNSEY">{constants.GUERNSEY}</option>
                <option value="AYRSHIRE">{constants.AYRSHIRE}</option>
              </select>
            </div>
            <div className="form-group">
              <SendFile images={this.state.cattle.photos} onUploadImage = {this.onUploadImage.bind(this)}
                        onDeleteImage = {this.onDeleteImage.bind(this)}/>
            </div>
          </div>
          <div className="register-grid-2">
            <div className="form-group">
              <label htmlFor="cattle-earring-number" className="col-form-label">{constants.Earring_Number}</label>
              <input
                id="cattle-earring-number"
                type="number"
                className="form-control"
                name="earring_number"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.earring_number != 'undefined' ? this.state.cattle.earring_number : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-source" className="col-form-label">{constants.SOURCE}</label>
              <select
                id="cattle-source"
                className="form-control"
                name="source"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.source != 'undefined' ? this.state.cattle.source : 'choosed'}>
                <option disabled value="choosed">{constants.CHOOSE_ONE}</option>
                <option value="birth">{constants.BIRTH}</option>
                <option value="buy">{constants.BUY}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cattle-birthday" className="col-form-label">{constants.BIRTHDAY}</label>
              <Datetime
                id="cattle-birthday"
                locale="pt_BR"
                timeFormat={false}
                utc={true}
                onChange={(e) => this.onChangeCattle("birthday", e._d)}
                value={typeof this.state.cattle.birthday != 'undefined' ? moment(this.state.cattle.birthday) : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-rgn" className="col-form-label">{constants.RGN}</label>
              <input
                id="cattle-rgn"
                type="text"
                className="form-control"
                name="RGN"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.RGN != 'undefined' ? this.state.cattle.RGN : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-mother-id" className="col-form-label">{constants.MOTHER}</label>
              <input
                id="cattle-mother-id"
                type="text"
                className="form-control"
                name="mother_id"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.mother_id != 'undefined' ? this.state.cattle.mother_id : ''}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cattle-note" className="col-form-label">{constants.COMMENTS}</label>
              <input
                id="cattle-note"
                type="text"
                className="form-control"
                name="note"
                onChange={(e) => this.onChangeCattle(e.target.name, e.target.value)}
                value={typeof this.state.cattle.note != 'undefined' ? this.state.cattle.note : ''}
              />
            </div>
            <div className="pro-btn-cattle-register">
              <div className="pro-btn-container-cattle-register">
                <input type="button" className="btn btn-warning" onClick={this.onSaveCattle.bind(this)} value={constants.SAVE}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    authenticationToken: state.cattleRegister.authenticationToken,
    cattle: state.cattleRegister.cattle,
    cattleList: state.cattleList.cattleList,
    successSave: state.cattleRegister.successSave,
    saveErrorMessage: state.cattleRegister.saveErrorMessage
  }),{
    saveCattle
  })(CattleRegister)
