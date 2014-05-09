Parse.initialize("JBOonUKeC2EOV3Z4xoqkUDUfMMPqz00BZgm2dKX2", "qTL4hD4PR8kZqp1ux8KXbwpdgNaxAddDUMY9W81G");


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
	getCreditNumber: function(){
		return this.CreditNumber;
	}

});


function addUser(dataArray){

	var user = new Parse.User();
	for (var i = 0;i<dataArray.length;i++){
		user.set(dataArray[i].name,dataArray[i].value);
	}
	user.save(null,{
		success: function(results){
			alert("Succee saved");
		},
		error:function(results,error){
			alert("Error: " + error.code + " " + error.message);
		}
	});	
}
