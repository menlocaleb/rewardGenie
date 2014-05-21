//Parse.initialize("JBOonUKeC2EOV3Z4xoqkUDUfMMPqz00BZgm2dKX2", "qTL4hD4PR8kZqp1ux8KXbwpdgNaxAddDUMY9W81G"); // old hideNSeek key
Parse.initialize("8IE4lU1jvQt72tVNPLfLg6YKsDMD5rR8pIUYUkg7", "rqKaLUoGAUZMWojI0IrHsgnr4ja3UzLRFrnJLi49"); // new app key

var currentUser = Parse.User.current();
var userLoginStatus = false;
var currentCard;

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
	

});

var Offer = Parse.Object.extend("Offer", {
	getOfferPercent: function() {
		return this.get("offerPercent");
	},
	card: function() {
		return this.get("card");
	}
});


var Card = Parse.Object.extend("Card", {
	getCardName: function() {
		return this.get("cardName");
	},
	getOfferDescription: function() {
		return this.get("offerDescription");
	},
	getBank: function() {
		return this.get("issuerBank");
	}
});

//var UserCard  = Parse.Card.extend("Card",)



//save the sign up form to server
function addUser(dataArray){

	var user = new Parse.User();
	for (var i = 0;i<dataArray.length;i++){
		user.set(dataArray[i].name,dataArray[i].value);
	}
	user.signUp(null,{
		success: function(results){
			//alert("Succeed saved");
			currentUser = Parse.User.current();
			
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
	    currentUser = Parse.User.current();
	    
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



/** Detect if the user has logged in.
If so, show the logged status header and tabbar controller
If not, show the signIn header
*/

function handleLogin(user){

	var loginElement = $("#login");

		if (!userLoginStatus){
			userLoginStatus = true;
			var button  = $("#dropdownButton");
			var name = user.getUsername();
			button.text(name);
			loginElement.show();			
			$('#signInForm').hide();
			$("#tabControl").show();
			showTabBar();

		}
		else {
			userLoginStatus = false;
			$("#dropdownButton").text("");
			$("#login").hide();
			$("#signInForm").show();
			$("#signInForm")[0].reset();
			currentUser = null;
			Parse.User.logOut();
			$("#tabControl").hide();
			window.reload();
		}
}



function addCreditCard(number){
	cardInfo.lookupCardNumber(number)
		.done(function(data) {
			$("#usercardInfoOutput").html("Bank: " + data.bank + "<br/> Card Type: " + data.card_type);
			$("#usercardInfoOutput").prop("class","alert alert-success")
			$("#addCreditCardToUser").show();
			currentCard = data;
		})
		.fail(function() {
			$("#usercardInfoOutput").html("Getting card data failed.");
			$("#usercardInfoOutput").prop("class","alert alert-danger")
			$("#addCreditCardToUser").hide();
		});
}

function saveCardToUser(){


}



// if bankName is null/not given then all cards are fetched
function getCardsByBank(bankName) {
	var query = new Parse.Query(Card);
	

	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " cards.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) { 
	      var object = results[i];
	      console.log(object.id + ' - ' + object.get('cardName'));
	    }
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});	
}

// Research on how to set up relations
//https://parse.com/questions/building-data-relationships-when-to-use-pointer-or-relation-type

// takes in list of Google business types, and callback
// checks parse for list of cards that have rewards for this type of place, then return data to callback
function getApplicableCards(placeTypes, callback) {
	var query = new Parse.Query(Offer);

	// check if any of the placeTypes are listed in the array for which an offer is valid
	// only one of the placeTypes has to match with any of the places listed in places for an offer
	// "" is symbolic - if in database entry, means that that reward applies to all purchases.
	placeTypes.push("");
	query.containedIn("places", placeTypes);

	query.include("card");
	query.descending("offerPercent");

	query.find({
	  success: function(results) {
	    console.log("Successfully retrieved " + results.length + " offers.");
	    callback(results);
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
	});

	// for debugging/testing
	console.log("Place types:");
	console.log(placeTypes);
}














