const CattleModel = require('../model/cattle.model');
const util = require('../tools/util');

exports.create = function(req,res) {
  let cattleJson = req.body.cattle;
  if(cattleJson.hasOwnProperty('birthday')){
    split = cattleJson.birthday.split('/');
    cattleJson.birthday =  new Date(split[1] + "/" +split[0]+"/"+split[2]);
  }
  let cattle = new CattleModel(cattleJson);

  cattle.save((err) => {
    if(err){
      console.log(err);
      util.resError(res, err);
    }else {
        res.json({
          success:true,
          message: "The cattle was stored with success!"
        });
    }
  });
}

exports.changeStatus = function(req,res){
  let id = req.param('id');
  let newStatus = req.param('newStatus');
  CattleModel.findById(cattle._id, function (err, cattleDB) {
    cattleDB.status = newStatus;
    cattleDB.save(function (err) {
      if (err) util.resError(res, err);
      else{
        res.json({
          success:true,
          message: "The cattle status was edited with success"
        });
      }
    });
  });
}

exports.edit = function(req,res) {
  let cattleJson = req.body.cattle
  let cattle = new CattleModel(cattleJson)
  CattleModel.findById(cattle._id, function (err, cattleDB) {
    cattleDB.name = cattle.name;
    cattleDB.earring_number = cattle.earring_number;
    cattleDB.gender = cattle.gender;
    cattleDB.source = cattle.source;
    cattleDB.coat = cattle.coat;
    cattleDB.RGN = cattle.RGN;
    cattleDB.RGD = cattle.RGD;
    cattleDB.mother_id = cattle.mother_id;
    cattleDB.father_id = cattle.father_id;
    cattleDB.note = cattle.note;
    cattleDB.photos = cattle.photos;
    cattleDB.birthday = cattle.birthday;
    cattleDB.breed = cattle.breed;
    cattleDB.status = cattle.status
    cattleDB.save(function (err) {
      if (err) util.resError(res, err);
      else{
        res.json({
          success:true,
          message: "The cattle was edited with success!"
        });
      }
    });
  });
}

exports.delete = function(req,res) {
  console.log('Entrei!');
  let id = req.param('id');
  console.log(id);
  CattleModel.findByIdAndRemove(id, function (err, todo) {  
    if (err){
      console.log(err);
      util.resError(res, err);
    } else{
      res.json({
        success:true,
        message: "The cattle was deleted with success!"
      });
    }
});
}

exports.list = function(req, res){
  CattleModel.find().sort('-created').exec((err,cattles) => {
    if(err) util.resError( res, err );
    else res.json( cattles );
  });
}
