"use strict";

import { connect } from 'react-redux';
import React from 'react';
import { toastr } from 'react-redux-toastr';


export class Gallery extends React.Component {

  constructor(props){
    super(props);
  }

  render() {

    const listNames = this.props.images.map((file) =>  {
      if(file.idx == 0){
        return <li data-target="#myCarousel" data-slide-to={file.idx} className="active"></li>
      }else{
        return <li data-target="#myCarousel" data-slide-to={file.idx}></li>
      }
    });

    const listImages = this.props.images.map((file) => {
      if(file.idx == 0){
        return <div className="item active"><img src={file.src} alt={file.name} /></div>
      }else{
        return <div className="item"><img src={file.src} alt={file.name} /></div>
      }
    });



    return( 
      <div id="myCarousel"  className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators" key={this.props.images.length}>
          { listNames }
        </ol>
        <div className="carousel-inner" key={this.props.images.length + 1}>
          { listImages }
        </div>
        <a className="left carousel-control" href="#myCarousel" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#myCarousel" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
}