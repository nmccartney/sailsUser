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
			
			User.publishCreate( user);
			
			// res.json(user);
			res.redirect('/user');
		});
	},
	/**
	 * FIND action
	 */
	find: function(req, res, next){
		
		var id = req.param('id');
		
		var idShortCut = isShortcut(id);
		
		console.log('------------');
		
		console.log(id,idShortCut);
		
		console.log('------------');
		
		if(id){
			
			User.findOne(id, function(err, user) {
				
				if(user === undefined) return res.notFound();
				
				if(err) return next(err);
	
				if (req.wantsJSON) {
					console.log('return json', user)
					
					res.json(user);
				} else {
					User.subscribe(req.socket, user);
					
					res.redirect('/user');
				}
			});
		} else{
			
			var where = req.param('where');
			
			if(_.isString(where)){
				where = JSON.parse(where);
			}
			
			var options = {
				limit: req.param('limit') || undefined,
				skip: req.param('skip') || undefined,
				sort: req.param('sort') || undefined,
				where: where || undefined
			}
			
			// console.log('this is the options : ', options);
			
			User.find(options, function(err, user) {

                if (user === undefined) return res.notFound();

                if (err) return next(err);
				
				if(req.isSocket){
					User.watch(req);
					User.subscribe(req.socket,user);
				}
				
				if (req.wantsJSON) {
					res.json(user);
				} else {
					res.view('user',{user:user})
				}

            });
			
		}
		
		function isShortcut(id) {
            if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                return true;
            }
        }
	},
	
	/**
	 * UPDATE action
	 */
	update: function(req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        User.update(id, criteria, function(err, user) {

            if (user.length === 0) return res.notFound();

            if (err) return next(err);
			
			console.log('editing',user);
			
			User.publishUpdate(user[0].id, user);
			
			res.redirect( '/user');

        });

    },
	
	/**
	 * EDIT action
	 */
	
	edit: function(req, res, next){
		var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }
		
		User.findOne(id,function(err, result) {
			
            if (err) return res.serverError(err);

            if (!result) return res.notFound();
			
			User.subscribe(req.socket, result);

			res.view('user/edit',{user:result})
        });
	},
	
	/**
	 *  DESTROY action
	 */
    destroy: function(req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }
		
		console.log('user',User.findOne(id))

        User.findOne(id,function(err, result) {
			
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            User.destroy(id, function(err) {

                if (err) return next(err);
				
				User.publishDestroy(result.id,req);

                // return res.json(result);
				res.redirect('/user');
            });

        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to UserController)
     */
    _config: {}

	
};

