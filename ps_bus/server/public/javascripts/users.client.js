// 'use strict';
//
// (function() {
//   window.serializeForm = function (formJson) {
//     var json = [];
//     for (var i = 0; i < formJson.length; i++) {
//         json[formJson[i].name] = formJson[i].value;
//     };
//     return json;
//   }
// })();
//
// $('.change-admin').submit(function( event ) {
//   event.preventDefault();
//   var data = serializeForm(event.target);
//   var url = $(this).attr('action');
//
//   window.$.ajax({
//     url: url,
//     method: 'PUT',
//     dataType: 'json',
//     data: data
//   })
//   .done(function( res ) {
//     if( res ) {
//       alert( res.message );
//     }
//   })
//   .fail( function( err ) {
//     if ( err ) {
//       console.log(err);
//       alert("err.message");
//     }
//   });
//
// });
$("#token-txt").click(function() {
  this.focus();
  this.select();
})
