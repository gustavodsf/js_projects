"use strict";

import { Table, Column, Cell } from 'fixed-data-table';
import React from 'react';
import InlineEdit from 'react-edit-inline';
import moment from 'moment';

export class OilList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Table
        rowHeight={38}
        rowsCount={this.props.oil.length}
        headerHeight={50}
        width={920}
        maxHeight={380}
      >
        <Column
          header={<Cell>Data-Hora</Cell>}
          cell={props => (
            <Cell width={250}>
              <input
                type="datetime-local"
                onChange={(e) => this.props.onChangeOil({"time": e.target.value}, props.rowIndex)}
                value={typeof this.props.oil[props.rowIndex].time != 'undefined' ? moment(this.props.oil[props.rowIndex].time.split('.')[0]).format("YYYY-MM-DDTHH:mm") : ''}
              />
            </Cell>
          )}
          width={250}
          align={'center'}
        />
        <Column
          header={<Cell>Ônibus</Cell>}
          cell={props => (
            <Cell width={100}>
              <InlineEdit
                activeClassName="editing"
                text={typeof this.props.oil[props.rowIndex].bus_number != 'undefined' ? this.props.oil[props.rowIndex].bus_number.toString() : ''}
                paramName="bus_number"
                change={(attribute) => this.props.onChangeOil(attribute,props.rowIndex)}
                style={{
                  display: 'inline-block',
                  margin: 0,
                  padding: 0,
                  fontSize: 15,
                  outline: 0,
                  border: 0
                }}
              />
            </Cell>
          )}
          width={100}
          align={'center'}
        />
        <Column
          header={<Cell>Quantidade (L)</Cell>}
          cell={props => (
            <Cell width={100}>
              <InlineEdit
                activeClassName="editing"
                text={typeof this.props.oil[props.rowIndex].amount != 'undefined' ? this.props.oil[props.rowIndex].amount.toString() : ''}
                paramName="amount"
                change={(attribute) => this.props.onChangeOil(attribute,props.rowIndex)}
                style={{
                  display: 'inline-block',
                  margin: 0,
                  padding: 0,
                  fontSize: 15,
                  outline: 0,
                  border: 0
                }}
              />
            </Cell>
          )}
          width={100}
          align={'center'}
        />
        <Column
          header={<Cell>Garagem</Cell>}
          cell={props => (
            <Cell width={100}>
              <select
                value={typeof this.props.oil[props.rowIndex].garage != 'undefined' ? this.props.oil[props.rowIndex].garage : ''}
                onChange={(e) => this.props.onChangeOil({"garage": e.target != null ? e.target.value : ''}, props.rowIndex)}
              >
                {this.props.regionals.map(function(regional) {
                  return <option key={regional.code} value={regional.code}>{regional.code}</option>;
                })}
              </select>
            </Cell>
          )}
          width={100}
          align={'center'}
        />
        <Column
          header={<Cell>Bomba</Cell>}
          cell={props => (
            <Cell width={100}>
              <select
                value={typeof this.props.oil[props.rowIndex].pump != 'undefined' ? this.props.oil[props.rowIndex].pump : ''}
                onChange={(e) => this.props.onChangeOil({"pump": e.target != null ? e.target.value : ''}, props.rowIndex)}
              >
                {this.props.pumps.map(function(pump) {
                  return <option key={pump.code} value={pump.code}>{pump.code}</option>;
                })}
              </select>
            </Cell>
          )}
          width={100}
          align={'center'}
        />
        <Column
          header={<Cell>Tanque</Cell>}
          cell={props => (
            <Cell width={100}>
              <select
                value={typeof this.props.oil[props.rowIndex].tank != 'undefined' ? this.props.oil[props.rowIndex].tank : ''}
                onChange={(e) => this.props.onChangeOil({"tank": e.target != null ? e.target.value : ''}, props.rowIndex)}
              >
                {this.props.tanks.map(function(tank) {
                  return <option key={tank.code} value={tank.code}>{tank.code}</option>;
                })}
              </select>
            </Cell>
          )}
          width={100}
          align={'center'}
        />
        <Column
          header={<Cell>Tipo de Combustível</Cell>}
          cell={props => (
            <Cell width={100}>
              <select
                value={typeof this.props.oil[props.rowIndex].fuel_type != 'undefined' ? this.props.oil[props.rowIndex].fuel_type : ''}
                onChange={(e) => this.props.onChangeOil({"fuel_type": e.target != null ? e.target.value : ''}, props.rowIndex)}
              >
                {this.props.oils.map(function(oil) {
                  return <option key={oil.code} value={oil.code}>{oil.code}</option>;
                })}
              </select>
            </Cell>
          )}
          width={100}
          align={'center'}
        />
        <Column
          cell={props => (
            <Cell width={70}>
              <a title="Remover Óleo" onClick={this.props.onDeleteOil.bind(this,props.rowIndex)} >
                <i className="fa fa-times fa-1x" aria-hidden="true"></i>
              </a>
            </Cell>
          )}
          width={70}
        />
      </Table>
    );
  }
}
