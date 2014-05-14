//Parse.initialize("JBOonUKeC2EOV3Z4xoqkUDUfMMPqz00BZgm2dKX2", "qTL4hD4PR8kZqp1ux8KXbwpdgNaxAddDUMY9W81G"); // old hideNSeek key
Parse.initialize("8IE4lU1jvQt72tVNPLfLg6YKsDMD5rR8pIUYUkg7", "rqKaLUoGAUZMWojI0IrHsgnr4ja3UzLRFrnJLi49"); // new app key

var currentUser;

var User = Parse.Object.extend("User", {
	//to prevent front end typo. Wrap up all gets and sets
	getId: function() {
		return this.id;
	},
	getUsername: function(){
		return this.username;
	},
	getPassword: function(){
		return this.password;
	},
	getEmail: function(){
		return this.email;
	}

});


function addUser(dataArray){

	var user = new Parse.User();
	for (var i = 0;i<dataArray.length;i++){
		user.set(dataArray[i].name,dataArray[i].value);
	}
	user.signUp(null,{
		success: function(results){
			alert("Succeed saved");
			currentUser = user;
		},
		error:function(results,error){
			alert("Error: " + error.code + " " + error.message);
		}
	});	
}

function userLogin(userdata){

	var username = userdata[0].value;
	var password  = userdata[1].value;

	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    alert("You have logged in!");
	    currentUser = user;
	    showUser();
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function showUser(){

	$('#dropdownUser').text = currentUser.getUsername();

}

function saveUserToServer(user){

	user.save(null,{
		success: function(results){
			console.log("successfully updated user");
		},
		error: function(results,error){
			alert("Error: " + error.code + " " + error.message);
		}
	});

}





