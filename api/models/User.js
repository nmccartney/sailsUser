/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username:{
      type:'email',
      required:true,
      unique:true
    },
    first_name:{
      type:'string',
      maxLenght:28
    },
    last_name:{
      type:'string',
      maxLenght:28
    }

  }
};

