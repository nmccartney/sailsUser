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
      maxLength:28,
      minLength:2,
      required:true
    },
    last_name:{
      type:'string',
      maxLength:28,
      minLength:2,
      required:true
    }
  },
  
  //model validation messages definitions
    validationMessages: { //hand for i18n & l10n
        username: {
            required: 'Username/email is required',
            email: 'Provide valid email address',
            unique: 'Email address is already taken'
        },
        first_name:{
          required: 'Username/email is required',
            first_name: 'Provide valid first name address',
        },
        last_name:{
          required: 'Last Name is required',
          last_name: 'Provide valid last name address',
        }
    }
};

