"use strict";

import { connect }    from 'react-redux';
import React          from 'react';
import update         from 'immutability-helper';
import { cattleList, goToEditCattle } from '../actions/index';
import { removeCattle } from '../actions/index';
import { Link }       from 'react-router';
import { MaskedInput } from 'react-text-mask';
import { toastr } from 'react-redux-toastr';
import { Table, Column, Cell } from 'fixed-data-table';
import { Gallery } from './gallery.component';

const constants = require('../constants/constants.types');
const moment = require('moment');

class CattleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cattleList: [],
      breedMap:{
        "HOLANDESA":    constants.HOLANDESA,
        "JERSEY":       constants.JERSEY,
        "PARDO_SUICA":  constants.PARDO_SUICA,
        "GIROLANDO":    constants.GIROLANDO,
        "GIR_LEITEIRO": constants.GIR_LEITEIRO,
        "PINZGUAER":    constants.PINZGUAER,
        "SIMENTAL":     constants.SIMENTAL,
        "RED_POLLED":   constants.RED_POLLED,
        "CARACU":       constants.CARACU,
        "PITANGUEIRAS": constants.PITANGUEIRAS,
        "NORMANDO":     constants.NORMANDO,
        "GUERNSEY":     constants.GUERNSEY,
        "AYRSHIRE":     constants.AYRSHIRE
      },
      cattleToDetail: { photos: []}
    };

    this.props.cattleList(this.props.authenticationToken);
  }

  componentWillReceiveProps(nextProps){
    if(typeof nextProps.removeSuccess != 'undefined' && nextProps.removeSuccess &&
       (typeof this.props.removeSuccess == 'undefined' || !this.props.removeSuccess)){
      toastr.success(constants.MSG_SUCCESS_REMOVED_CATTLE);
      this.props.cattleList(this.props.authenticationToken);
    }

    if(nextProps.cattleHasLoaded && !this.props.cattleHasLoaded){
      this.setState({
        cattleList: nextProps.cattleListJson,
        cattleToDetail: nextProps.cattleListJson[0]
      });
    }
  }

  onDetailCattle(idx){
    let cattleToDetail = this.state.cattleList[idx]
    let birthday =  moment.parseZone(cattleToDetail.birthday);
    cattleToDetail.birthday = (birthday._d.getDate() + 1)+'/'+(birthday._d.getMonth() + 1)+'/'+birthday._d.getFullYear() ;
    this.setState({ cattleToDetail:  cattleToDetail});
  }

  onDeleteCattle(idx){
    let confirmation = confirm("Você tem certeza que deseja excluir este animal?");
    if(confirmation){
      this.props.removeCattle(this.state.cattleList[idx], this.props.authenticationToken);
    }
  }

  onEditCattle(){
    this.props.goToEditCattle(this.state.cattleToDetail);
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
        <div className="list">
          <div className="pro-header-list">
            <div className="pro-header-title">
              <h3>{ constants.LIST_CATTLE }</h3>
            </div>
          </div>
          <div className="table-container">
            <div className="cow-table">
              <Table
                rowHeight={60}
                headerHeight={30}
                rowsCount={this.state.cattleList.length}
                width={750}
                height={600}
                {...this.props}>
                <Column
                  header={<Cell>Foto</Cell>}
                  cell={props => (
                    <Cell width={100}>
                      <img className="table-cow-image" src={this.state.cattleList[props.rowIndex].photos.length > 0 ? this.state.cattleList[props.rowIndex].photos[0].src : '' } />
                    </Cell>
                  )}
                  width={100}
                  align={'center'}/>
                <Column
                  header={<Cell>Nome</Cell>}
                    cell={props => (
                    <Cell width={100}>
                      <span>{this.state.cattleList[props.rowIndex].name}</span>
                    </Cell>
                  )}
                  width={100}
                />
                <Column
                  header={<Cell>Número do Brinco</Cell>}
                    cell={props => (
                    <Cell width={200}>
                      <span>{this.state.cattleList[props.rowIndex].earring_number}</span>
                    </Cell>
                  )}
                  width={200}
                />
                <Column
                  header={<Cell>Raça</Cell>}
                    cell={props => (
                    <Cell width={150}>
                      <span>{this.state.breedMap[this.state.cattleList[props.rowIndex].breed]}</span>
                    </Cell>
                  )}
                  width={150}
                />
                <Column
                  header={<Cell>Estado</Cell>}
                    cell={props => (
                    <Cell width={100}>
                      <span>{this.state.cattleList[props.rowIndex].status}</span>
                    </Cell>
                  )}
                  width={100}
                />
                <Column
                  cell={props => (
                    <Cell width={100}>
                      <a title="Editar Animal" className="pro-link-left"
                         onClick={ () => this.onDetailCattle(props.rowIndex)}>
                        <i className="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                      </a>
                      <a title="Remover Animal" className="pro-link-right"
                        onClick={ () => this.onDeleteCattle(props.rowIndex)}>
                        <i className="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>
                    </Cell>
                  )}
                  width={100}
                />
              </Table>
            </div>
          </div>
          <div className="list-subheader">
            <div className="pro-second-header">
              <h4>{ constants.DETAIL_CATTLE }</h4>
            </div>
          </div>
          <div className="list-detail">
            <table className="table table-striped">
              <tbody>
                <tr>
                  <td><b>{constants.NAME}:</b></td>
                  <td>{this.state.cattleToDetail.name}</td>
                </tr>
                <tr>
                  <td ><b>{constants.Earring_Number}:</b></td>
                  <td>{this.state.cattleToDetail.earring_number}</td>
                </tr>
                <tr>
                  <td ><b>{constants.BREED}:</b></td>
                  <td>{this.state.breedMap[this.state.cattleToDetail.breed]}</td>
                </tr>
                <tr>
                  <td ><b>{constants.GENDER}:</b></td>
                  <td>{this.state.cattleToDetail.hasOwnProperty('gender') ? (this.state.cattleToDetail.gender == 'male' ? 'Macho' : 'Fêmea') : ''}</td>
                </tr>
                <tr>
                  <td><b>{constants.COAT}:</b></td>
                  <td>{this.state.cattleToDetail.coat}</td>
                </tr>
                <tr>
                  <td><b>{constants.SOURCE}:</b></td>
                  <td>{this.state.cattleToDetail.hasOwnProperty('source') ? (this.state.cattleToDetail.source == 'birth' ? constants.BIRTH : constants.BUY) : '' }</td>
                </tr>
                <tr>
                  <td><b>{constants.BIRTHDAY}:</b></td>
                  <td>{moment(this.state.cattleToDetail.birthday).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <td><b>{constants.RGD}:</b></td>
                  <td>{this.state.cattleToDetail.RGD}</td>
                </tr>
                <tr>
                  <td><b>{constants.RGN}:</b></td>
                  <td>{this.state.cattleToDetail.RGN}</td>
                </tr>
                <tr>
                  <td><b>{constants.MOTHER}:</b></td>
                  <td>{this.state.cattleToDetail.mother_id}</td>
                </tr>
                <tr>
                  <td><b>{constants.FATHER}:</b></td>
                  <td>{this.state.cattleToDetail.father_id}</td>
                </tr>
                <tr>
                  <td><b>{constants.COMMENTS}:</b></td>
                  <td>{this.state.cattleToDetail.note}</td>
                </tr>
                <tr>
                  <td><b>{constants.STATUS}:</b></td>
                  <td>{this.state.cattleToDetail.status}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input type="button" className="btn btn-warning"
                          onClick={ () => this.onEditCattle()} value={constants.EDIT}/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="list-images">
            <Gallery images={this.state.cattleToDetail.photos} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    authenticationToken: state.cattleList.authenticationToken,
    cattleListJson: state.cattleList.cattleList,
    removeSuccess: state.cattleList.removeSuccess,
    cattleHasLoaded: state.cattleList.cattleHasLoaded
  }),{
    cattleList,
    goToEditCattle,
    removeCattle
  })(CattleList)
