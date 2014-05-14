//Parse.initialize("JBOonUKeC2EOV3Z4xoqkUDUfMMPqz00BZgm2dKX2", "qTL4hD4PR8kZqp1ux8KXbwpdgNaxAddDUMY9W81G"); // old hideNSeek key
Parse.initialize("8IE4lU1jvQt72tVNPLfLg6YKsDMD5rR8pIUYUkg7", "rqKaLUoGAUZMWojI0IrHsgnr4ja3UzLRFrnJLi49"); // new app key

var currentUser;
var userLoginStatus = false;

var User = Parse.Object.extend("User", {
	//to prevent front end typo. Wrap up all gets and sets
	getId: function() {
		return this.get("id");
	},
	getUsername: function(){
		return this.get("username");
	},
	getPassword: function(){
		return this.get("password");
	},
	getEmail: function(){
		return this.get("email");
	}

});


function addUser(dataArray){

	var user = new Parse.User();
	for (var i = 0;i<dataArray.length;i++){
		user.set(dataArray[i].name,dataArray[i].value);
	}
	user.signUp(null,{
		success: function(results){
			//alert("Succeed saved");
			currentUser = user;
			
			handleLogin(user);
		},
		error:function(results,error){
			alert("Error: " + error.code + " " + error.message);
		}
	});	
}

function userLogin(userdata){

	//alert("check login");
	var username = userdata[0].value;
	var password  = userdata[1].value;

	Parse.User.logIn(username, password, {
	  success: function(user) {
	    // Do stuff after successful login.
	    //alert("You have logged in!");
	    currentUser = user;
	    
	    handleLogin(currentUser);
	  },
	  error: function(user, error) {
	    // The login failed. Check error to see why.
	    alert("Error: " + error.code + " " + error.message);
	  }
	});


}

function saveUserToServer(user){

	user.save(null,{
		success: function(results){
			console.log("successfully updated user");
			handleLogin(currentUser);
		},
		error: function(results,error){
			alert("Error: " + error.code + " " + error.message);
		}
	});

}




function handleLogin(user){

	var loginElement = $("#login");

		if (!userLoginStatus){
			userLoginStatus = true;
			var button  = $("#dropdownButton");
			var name = user.getUsername();
			console.log(button);
			console.log(name);
			//button.prop('value',name);
			button.text(name);
			loginElement.show();			
			$('#signInForm').hide();

		}
		else {
			userLoginStatus = false;
			$("#dropdownButton").text("");
			$("#login").hide();
			$("#signInForm").show();
			$("#signInForm")[0].reset();
			currentUser = null;
			//parent.location.reload();
		}
}




function isLoggin(user){
	

}


