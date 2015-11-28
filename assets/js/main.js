
(function (io) {
	
	io.socket.on('connect', function(){
		console.log('sails connected.');
	});
		
	io.socket.get("/user", function (response) { });
	
	io.socket.on("user", function(event){
		console.log('userEvent :: ',event);
		switch(event.verb){
			case "created":
				UserList.add(event)
				break;
			case 'updated':
				UserList.update();
				break;
			case 'destroyed':
				UserList.delete(event.id);
				break;
			default:
				console.log('defaulted : ', event.verb);
		}
	});
	
	io.socket.on('message', function notifReceivedFromServer ( message ) {
		console.log('message ' ,message);
	});
	
	var UserList = {
		"add":function(user){
			// try and subscribe to new model
			io.socket.get("/user/"+user.data.id, function (response) { });
			// create user template
			var um = '<tr id="user-'+user.data.id+'">';
			um += '<td ><div class="badge badge-info">'+user.data.id+'</div></td>';
			um += '<td>'+user.data.username+'</td>';
			um += '<td>'+user.data.first_name+'</td>';
			um += '<td>'+user.data.last_name+'</td>';
			um += '<td>'+user.data.createdAt+'</td>';
			um += '<td><a href="/user/edit/'+user.data.id+'" class="btn btn-primary">edit</a>';
			um += '<a href="/user/delete/'+user.data.id+'" class="btn btn-danger">delete</a></td>';
			um += '</tr>';
			console.log('adding : ',um);
			// add to table
			$('.table tbody').append(um);
		},
		"delete": function(user){
			console.log('deleting : ',user);
			$('#user-'+user).remove();
		},
		"update": function(user){
			console.log('updating : ',user);
		}
	};

	

})(io);
