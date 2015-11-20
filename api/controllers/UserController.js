/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	/**
	 * CREATE action
	 */
	create: function (req, res, next){
		
		var params = req.params.all();
		
		User.create(params,function(err,user){
			if(err)return next(err);
			
			res.status(201);
			
			res.json(user);
		});
	}
};

