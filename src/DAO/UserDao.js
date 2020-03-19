"use strict";

var Models = require("../Models/User");

const createUser = objToSave => {
  new Promise((resolve, reject) => {
    new Models(objToSave)
      .save()
      .then(client => resolve(client))
      .catch(err => {
        reject(err);
        console.log(err);
      });
  });
};

const getUsers = criteria => {
  new Promise((resolve, reject) => {
    Models.find(criteria)
      .then(client => resolve(client))
      .catch(err => reject(err));
  });
};

module.exports = {
  createUser: createUser,
  getUsers: getUsers
};
