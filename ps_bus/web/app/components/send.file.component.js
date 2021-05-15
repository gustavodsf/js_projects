"use strict";

import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router';
import FileInput from 'react-file-input';
import{ sendFileFuncionario } from '../actions';
import{ sendFileFrota } from '../actions';
import { toastr } from 'react-redux-toastr';


class SendFile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {file: "", type: "", redraw: 0};
  }


  componentWillReceiveProps(nextProps) {
    toastr.success("Sucesso!", "Arquivo enviado com sucesso.");
    this.state = {file: "", type: "", redraw: this.state.redraw + 1};
    console.log(this.state);
  }


  render() {

    const  onOpenWorkload = (e) =>  {
      e.preventDefault()
      let reader = new FileReader();
      
      
      reader.onloadend = () => {
        if(this.state.type == 'FROTA'){
          this.props.sendFileFrota(reader.result);
        }else if(this.state.type == 'FUNCIONARIO'){
          this.props.sendFileFuncionario(reader.result);
        }else{
          toastr.error("Erro!",'Preencha o tipo do arquivo!')
        }
      }

      if(this.state.file != ""){
        reader.readAsText(this.state.file);
      }else{
        toastr.error("Erro!",'Esqueceu de adicionar um arquivo!')
      }
    }

    return(      
    <div id="container" className="col-sm-9 col-md-6">
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

      <div className="pro-external-div">
        <div className="pro-div-upload-file">
          <form id="upload-form" onSubmit= { onOpenWorkload }>
            <div className="pro-upload-logo"></div>
            <fieldset>
              <legend className="pro-upload-title">Enviar Arquivo</legend>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" value="FUNCIONARIO" key={this.state.redraw}
                             onChange={(e)=>this.setState({type: e.target.value})} /> Funcionário
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" value="FROTA" key={this.state.redraw}
                          onChange={(e)=>this.setState({type: e.target.value})} /> Frota
                </label>
              </div>
              <div className="form-group">
                <input type="file" name="csvdata" accept="text/cvs" onChange={(e)=> this.setState({file: e.target.files[0]})}  key={this.state.redraw}/>
              </div>
              <div className="form-group">
                <input className="btn btn-warning" type="submit" value="Enviar" />
              </div>
            </fieldset>
            <div>
              <h4 className="pro-upload-title lower">CSV</h4>
              <div className="alert alert-danger">
                <strong>Atenção!</strong> Como entrada esperamos um arquivos csv. Contudo, o mesmo não deve possuir cabeçalho.
              </div>
              <div className="alert alert-info">
                <strong>Funcionário:</strong> O de funcionários deve possuir as colunas na seguinte ordem: matrícula, nome completo e data de adminissão.
              </div>
              <div className="alert alert-success">
                 <strong>Frota:</strong> Mo caso da frota o csv deve possuir as colunas na seguinte ordem: 
                 placa do carro, capacidade do tank, número do ônibus, modelo da carroceria, fabricante da carroceria, modelo do chassi e marca do chassi.
              </div>
            </div>
          </form>
        </div>
      </div>
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
    </div>)
  }
}

export default connect(  (state, ownProps) => ({
  error: state.send_file.error,
}),{
  sendFileFuncionario,
  sendFileFrota
})(SendFile)
