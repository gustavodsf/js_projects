"use strict";

import { Table, Column, Cell } from 'fixed-data-table';
import React from 'react';
import InlineEdit from 'react-edit-inline';
import moment from 'moment';

export class RefuelList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Table
        rowHeight={38}
        rowsCount={this.props.refuel.length}
        headerHeight={50}
        width={1120}
        maxHeight={380}
      >
        <Column
          header={<Cell>Data-Hora</Cell>}
          cell={props => (
            <Cell width={250}>
              <input
                type="datetime-local"
                onChange={(e) => this.props.onChangeRefuel({"time": e.target.value}, props.rowIndex)}
                value={typeof this.props.refuel[props.rowIndex].time != 'undefined' ? moment(this.props.refuel[props.rowIndex].time.split('.')[0]).format("YYYY-MM-DDTHH:mm") : ''}
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
                text={typeof this.props.refuel[props.rowIndex].bus_number != 'undefined' ? this.props.refuel[props.rowIndex].bus_number.toString() : ''}
                paramName="bus_number"
                change={(attribute) => this.props.onChangeRefuel(attribute,props.rowIndex)}
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
          header={<Cell>Motorista</Cell>}
          cell={props => (
            <Cell width={100}>
              <InlineEdit
                activeClassName="editing"
                text={typeof this.props.refuel[props.rowIndex].driver_registration != 'undefined' ? this.props.refuel[props.rowIndex].driver_registration.toString() : ''}
                paramName="driver_registration"
                change={(attribute) => this.props.onChangeRefuel(attribute,props.rowIndex)}
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
          header={<Cell>Odômetro (Km)</Cell>}
          cell={props => (
            <Cell width={100}>
              <InlineEdit
                activeClassName="editing"
                text={typeof this.props.refuel[props.rowIndex].odometer != 'undefined' ? this.props.refuel[props.rowIndex].odometer.toString() : ''}
                paramName="odometer"
                change={(attribute) => this.props.onChangeRefuel(attribute,props.rowIndex)}
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
                value={typeof this.props.refuel[props.rowIndex].garage != 'undefined' ? this.props.refuel[props.rowIndex].garage : ''}
                onChange={(e) => this.props.onChangeRefuel({"garage": e.target != null ? e.target.value : ''}, props.rowIndex)}
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
          header={<Cell>Quantidade (L)</Cell>}
          cell={props => (
            <Cell width={100}>
              <InlineEdit
                activeClassName="editing"
                text={typeof this.props.refuel[props.rowIndex].fuel != 'undefined' ? this.props.refuel[props.rowIndex].fuel.toString() : ''}
                paramName="fuel"
                change={(attribute) => this.props.onChangeRefuel(attribute,props.rowIndex)}
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
          header={<Cell>Bomba</Cell>}
          cell={props => (
            <Cell width={100}>
              <select
                value={typeof this.props.refuel[props.rowIndex].pump != 'undefined' ? this.props.refuel[props.rowIndex].pump : ''}
                onChange={(e) => this.props.onChangeRefuel({"pump": e.target != null ? e.target.value : ''}, props.rowIndex)}
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
                value={typeof this.props.refuel[props.rowIndex].tank != 'undefined' ? this.props.refuel[props.rowIndex].tank : ''}
                onChange={(e) => this.props.onChangeRefuel({"tank": e.target != null ? e.target.value : ''}, props.rowIndex)}
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
                value={typeof this.props.refuel[props.rowIndex].fuel_type != 'undefined' ? this.props.refuel[props.rowIndex].fuel_type : ''}
                onChange={(e) => this.props.onChangeRefuel({"fuel_type": e.target != null ? e.target.value : ''}, props.rowIndex)}
              >
                {this.props.fuels.map(function(fuel) {
                  return <option key={fuel.code} value={fuel.code}>{fuel.code}</option>;
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
              <a title="Remover Abastecimento" onClick={this.props.onDeleteRefuel.bind(this,props.rowIndex)} >
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
