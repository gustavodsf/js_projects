"use strict";

import { connect } from 'react-redux';
import React from 'react';
import { toastr } from 'react-redux-toastr';


export class SendFile extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    function onGetImage(e,onUploadImage){
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        let imgJson = { 'name': file.name , 'src': reader.result }
        onUploadImage(imgJson);
      }
      
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }

    const listImages = this.props.images.map((file) =>
      <tr key={file.idx}>
        <td><img id='img' src={file.src} height='50' alt='Prévia da imagem...' /></td>
        <td>{ file.name } </td>
        <td><input type='button' className='btn btn-danger' value='Excluir' onClick={ () => this.props.onDeleteImage(file.idx) }/></td>
      </tr>
    );

    return( 
      <form id="upload-form">
        <div className="form-group">
          <div className="fileUpload btn btn-success">
              <span>Selecionar Imagem</span>
              <input type="file" className="upload"  onChange={ (e) => onGetImage(e,this.props.onUploadImage) }  accept="image/gif, image/jpeg, image/png"/>
          </div>
          <div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Arquivo</th>
                  <th>Nome</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="imageTableBody" key={this.props.images.length}>
                  {listImages}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    );
  }
}