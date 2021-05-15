"use strict";
import { Link }    from 'react-router';
import { connect } from 'react-redux';
import React       from 'react';
import { toastr } from 'react-redux-toastr';
import { productionList } from '../actions/index';
import { removeProduction } from '../actions/index';
import { Table, Column, Cell } from 'fixed-data-table';

const constants = require('../constants/constants.types');
const moment = require('moment');

class ProductionList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      productionList: [],
    };
    this.props.productionList(this.props.authenticationToken);
  }

  componentWillReceiveProps(nextProps){
     if(typeof nextProps.removeSuccess != 'undefined' && nextProps.removeSuccess &&
       (typeof this.props.removeSuccess == 'undefined' || !this.props.removeSuccess)){
      toastr.success(constants.MSG_SUCCESS_REMOVED_PRODUCTION);
      this.props.productionList(this.props.authenticationToken);
    }

    if(nextProps.productionHasLoaded && !this.props.productionHasLoaded){
      this.setState({
        productionList: nextProps.productionListJson
      });
    }
  }

  onDeleteProduction(rowIndex){
    let confirmation = confirm("Você tem certeza que deseja excluir esta produção?");
    if(confirmation){
      this.props.removeProduction(this.state.productionList[rowIndex], this.props.authenticationToken);
    }
  }

  convertDate2String(date){
    let birthday =  moment.parseZone(date);
    return (birthday._d.getDate() + 1)+'/'+(birthday._d.getMonth() + 1)+'/'+birthday._d.getFullYear() ;
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
          <div className="pro-header-list">
            <div className="pro-header-title">
              <h3>{ constants.LIST_PRODUCTION }</h3>
            </div>
          </div>
          <div className="table-container">
            <div className="cow-table">
              <Table
                rowHeight={60}
                headerHeight={30}
                rowsCount={this.state.productionList.length}
                width={750}
                height={600}
                {...this.props}>
                 <Column
                  header={<Cell>Dia</Cell>}
                  cell={props => (
                    <Cell width={100}>
                      <span>{this.convertDate2String(this.state.productionList[props.rowIndex].date)}</span>
                    </Cell>
                  )}
                  width={100}
                  align={'center'}/>
                <Column
                  header={<Cell>Produção</Cell>}
                    cell={props => (
                    <Cell width={100}>
                      <span>{this.state.productionList[props.rowIndex].value}</span>
                    </Cell>
                  )}
                  width={100}
                />
                <Column
                  cell={props => (
                    <Cell width={100}>
                      <a title="Remover Animal" className="pro-link-right"
                        onClick={ () => this.onDeleteProduction(props.rowIndex)}>
                        <i className="fa fa-times fa-2x" aria-hidden="true"></i>
                      </a>
                    </Cell>
                  )}
                  width={100}
                />
              </Table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(  (state, ownProps) => ({
  authenticationToken: state.cattleRegister.authenticationToken,
  productionListJson: state.productionList.productionList,
  removeSuccess: state.productionList.removeSuccess,
  productionHasLoaded: state.productionList.productionHasLoaded
}),{
  productionList,
  removeProduction
})(ProductionList)
