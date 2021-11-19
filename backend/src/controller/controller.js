'use strict';

const { response } = require('express');
const People = require('../model/model');


exports.findAll = function(req, res) {
    People.findAll(function(err, people) {
        if (err)
            res.status(201).send(err);
        console.log('res', people);
        res.status(200).send(people);
    });
};



exports.create = function(req, res) {
    
    const newPeopleObj = new People(req.body);
    People.findByEmail(newPeopleObj.email, function(err, epeople) {
      if (err)
        res.status(204).send(err);
      else if(epeople.length>0)
        { console.log("Email already exists")
          res.status(205).json({error:true,message:"Email already exists"});
      }
      else{
        People.create(newPeopleObj, function(err, people) {
          if (err)
            res.status(206).json({error:true,message:"Error during creation of New People!"});
          res.status(207).json({error:false,message:"People added successfully!",data:people});
        });
      }
    });        
};



exports.findById = function(req, res) {
    People.findById(req.params.id, function(err, people) {
      if (err)
        res.status(202).send(err);
      res.status(203).json(people);
    });
};


//function to update the details of people
exports.update = function(req, res) {
  var newPeopleObj = new People(req.body);
  People.findByEmail(newPeopleObj.email, function(err, epeople) {
    if (err)
      res.status(212).send(err);
    else if(epeople.length>0)
      { console.log("Email already exists")
        res.status(213).json({error:true,message:"Email already exists"});
    }
        else{
        People.update(req.params.id,newPeopleObj , function(err, people) {
          if (err)
            res.status(208).json({ error:true, message: 'Error occured during update of people' });
          res.status(209).json({ error:false, message: 'People successfully updated' });
        });
      }
      });
};


//function to delete the details of people
exports.delete = function(req, res) {
    People.delete( req.params.id, function(err, people) {
      if (err)
        res.status(210).json({ error:true, message: 'Error occured during deletion' });
      res.status(211).json({ error:false, message: 'people successfully deleted' });
    });
};