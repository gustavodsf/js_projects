"use strict";

import { Component } from 'react';
import { Link }      from 'react-router';
import React         from 'react';


class Menu extends Component {

  render() {
    const  shutdownTotem = (e) =>  {
      if(confirm("Você tem certeza que deseja desligar o totem?")){
        let exec = require('child_process').exec;
        exec('shutdown -f now');
      }
    }

    return(
      <div className="col-sm-9 col-md-6" id="container">
         <div id="header">
            <image id="montagemImagem" src="./assets/image/Montagem-Foto-Site-Progresso.jpg" alt="montagem_progresso" />
          </div>
          <div id="containerMenu">
              <div className="btn-group-vertical">
              	<Link id="btn-refuel" className="btn btn-primary" to="/open/workload">
                  <image className="icone_botoes" src="./assets/image/gas_station.png" alt="icone_abastecimento" />
                  <br />
                  <span id="txt-refuel">Abastecimento</span>
                </Link>
                <Link id="btn-admin"className="btn btn-primary" to="/login">
                  <image className="icone_botoes" src="./assets/image/manager.png" alt="icone_administracao" />
                  <br />
                  <span id="txt-admin">Administração</span>
                </Link>
                <Link className="btn btn-primary shutdown" onClick={shutdownTotem}>
                    <image className="icone_botoes" src="./assets/image/icone_shutdown.png" alt="icone_desligar" />
                    <br />Desligar totem
                     <span id="txt-trun-off">Desligar totem</span>
                </Link>
              </div>
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
export default Menu