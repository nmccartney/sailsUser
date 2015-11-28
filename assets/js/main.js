
(function (io) {
	
	io.socket.on('connect', function(){
		console.log('sails connected.');
		
		
		setTimeout(function(){
			
		})
		},5000);
		
		io.socket.get("/user", function (response) { 
		
		io.socket.on("user", function(event){
			console.log('userEvent :: ',event);
			switch(event.verb){
				case "created":
					UserList.add(event)
					break;
				case 'updated':
					UserList.updated();
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
		
	});
	
	var UserList = {
		"add":function(user){
			
			var um = '<tr id="user-'+user.data.id+'">';
			um += '<td ><div class="badge badge-info">'+user.data.id+'</div></td>';
			um +=  '<td>'+user.data.username+'</td>';
			um +=  '<td>'+user.data.first_name+'</td>';
			um +=  '<td>'+user.data.last_name+'</td>';
			um += '<td>'+user.data.createdAt+'</td>';
			um += '<td><a href="/user/edit/'+user.data.id+'" class="btn btn-primary">edit</a>';
			um += '<a href="/user/delete/'+user.data.id+'" class="btn btn-danger">delete</a></td>';
			um +=  '</tr>';
			console.log('adding : ',um);
			$('.table tbody').append(um);
		},
		"delete": function(user){
			console.log('deleting : ',user);
			$('#user-'+user).remove();
		},
		"update": function(user){
			console.log('updating : ',user);
		}
	}

	
//   // as soon as this file is loaded, connect automatically, 
//   var socket = io.connect();
//   if (typeof console !== 'undefined') {
//     log('Connecting to Sails.js...');
//   }

//   socket.on('connect', function socketConnected() {

  
//     ///////////////////////////////////////////////////////////
//     // Here's where you'll want to add any custom logic for
//     // when the browser establishes its socket connection to 
//     // the Sails.js server.
//     ///////////////////////////////////////////////////////////
//     log(
//         'Socket is now connected and globally accessible as `socket`.\n' + 
//         'e.g. to send a GET request to Sails, try \n' + 
//         '`socket.get("/", function (response) ' +
//         '{ console.log(response); })`'
//     );
//     ///////////////////////////////////////////////////////////
	
	
// 	socket.get("/user/21", function (response) { 
// 		console.log('resp : ',response); 
// 	})
	
	
// 	// Listen for Comet messages from Sails
//     socket.on('message', function messageReceived(message) {

//       ///////////////////////////////////////////////////////////
//       // Replace the following with your own custom logic
//       // to run when a new message arrives from the Sails.js
//       // server.
//       ///////////////////////////////////////////////////////////
//       log('New comet message received :: ', message);
//       //////////////////////////////////////////////////////

//     });

//     // This is the part I added: 
//     // Room.subscribe(req, [{id: "5278861ab9a0d2cd0e000001"}], function (response) {
//     //   console.log('subscribed?');
//     //   console.log(response);
//     // });
//     //


//    });


//   // Expose connected `socket` instance globally so that it's easy
//   // to experiment with from the browser console while prototyping.
//   window.socket = socket;


//   // Simple log function to keep the example simple
//   function log () {
//     if (typeof console !== 'undefined') {
//       console.log.apply(console, arguments);
//     }
//   }


})(io);


// socket.on('connect', function socketConnected() {
// 	console.log("This is from the connect: ", this.socket.sessionid);
// });