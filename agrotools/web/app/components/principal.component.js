"use strict";
import { Link }    from 'react-router';
import { connect } from 'react-redux';
import React       from 'react';

const constants = require('../constants/constants.types');

class Principal extends React.Component {

  constructor(props) {
    super(props);
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
              <li className="active"><Link to="/principal">{ constants.HOME }</Link></li>
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
        <div className="pro-principal-container">
          <div className="pro-header-principal">
            <div className="pro-header-title">
              <h3>{ constants.PRINCIPAL_HEADER }</h3>
            </div>
          </div>

          <div className="pro-header-production">
            <div className="pro-second-header">
                <h4>{ constants.PRODUCTION }</h4>
            </div>
          </div>

          <div className="production-grid-1">
          </div>

          <div className="production-grid-2">
          </div>


          <div className="pro-header-cattle">
            <div className="pro-second-header">
              <h4>{ constants.CATTLE }</h4>
          </div>
          </div>

          <div className="cattle-grid-1">
          </div>

          <div className="cattle-grid-2">
          </div>

          <div className="pro-header-input">
            <div className="pro-second-header">
                <h4>{ constants.INPUT }</h4>
            </div>
          </div>

          <div className="input-grid-1">
          </div>

          <div className="input-grid-2">
          </div>
        </div>
      </div>
    )
  }
}

export default connect(  (state, ownProps) => ({
}),{
})(Principal)
