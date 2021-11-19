'use strict';

var sqlConn = require('../../configs/mysql_config');


//People object create
var People = function(people){
  this.first_name     = people.first_name;
  this.last_name      = people.last_name;
  this.email          = people.email;
  this.mobile          = people.mobile;
//   this.created_at     = new Date();
//   this.updated_at     = new Date();
};


People.create = function (newPeople, result) {
    sqlConn.query("INSERT INTO peoples set ?", newPeople, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};



People.findById = function (id, result) {
    sqlConn.query("Select * from peoples where id = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        else{
            result(null, res);
        }
    });
};


People.findByEmail = function (id, result) {
    sqlConn.query("Select * from peoples where email = ? ", id, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        else{
            result(null, res);
        }
    });
};




People.findAll = function (result) {
    sqlConn.query("Select * from peoples", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        else{
            console.log('peoples : ', res);
            result(null, res);
        }
    });
};



People.update = function(id, people, result){
    sqlConn.query("UPDATE peoples SET first_name=?,last_name=?,email=?,mobile=? WHERE id = ?", [people.first_name,people.last_name,people.email,people.mobile, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        else{
            result(null, res);
        }
    });
};



People.delete = function(id, result){
    console.log("id",id)
    sqlConn.query("DELETE FROM peoples WHERE id = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        else{
            result(null, res);
        }
    });
};


module.exports= People;