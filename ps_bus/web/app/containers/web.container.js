"use strict";

import React from 'react';
import ReduxToastr from 'react-redux-toastr';

let Web = React.createClass({
  render: function() {
    return (
      <div>
          <ReduxToastr timeOut={4000} newestOnTop={false} preventDuplicates={true} position="top-center" transitionIn="fadeIn" transitionOut="fadeOut" progressBar/>
          {this.props.children}
      </div>
    );
  }
});
export default Web
