/* Main JS file for Reward Genie */

/*
BoA
Earn 1% cash back on purchases, 2% cash back at grocery stores and 3% cash back on gas

Chase
5% cash back on up to $1500 in combined purchases at Restaurants and LOWES

Discover
5% Cashback Bonus at Home Improvement Stores, Furniture Stores, plus Bed Bath & Beyond on up to $1,500 in purchases
*/



// Start of execution
$(document).ready(function() {

	$("#getCardDetailsButton").click(function() {
		cardInfo.lookupCardNumber($("#cardNumberInput").val())
		.done(function(data) {
			$("#cardInfoOutput").html("Bank: " + data.bank + "<br/> Card Type: " + data.card_type);
		})
		.fail(function() {
			alert("Getting card data failed.");
		});
		
	});

	//initialize();
	google.maps.event.addDomListener(window, 'load', initialize);
	$('.dropdown-toggle').dropdown();
	$('#geolocationError').hide();
	//$('#login').css('display',"none!important");
	if (!currentUser){
		$('#login').hide();
		$("#signInForm").show();
	}
	else {
		handleLogin(currentUser);
	}
	//$('#map-canvas').show();

	// Test get card details
	getCardsByBank('bankName');
});


$("#logOutButton").click(function(){
		handleLogin(currentUser);
});


function closePopUp(){
	$('#myModal').modal('hide')
}


$("#signupform").submit(function(e){
    //alert("Submitted");
    //event.preventDefault();

    var fields = $(this).serializeArray();
    addUser(fields); 
	closePopUp();
	return false;

  });


$('#signInForm').submit(function(e){

	var fields = $(this).serializeArray();

	userLogin(fields);

	return false;
});




$('#Signup').click(function() {
		
		// Getting the variable's value from a link 
		// var loginBox = $(this).attr('href');

		// //Fade in the Popup and add close button
		// $(loginBox).fadeIn(300);
		
		// //Set the center alignment padding + border
		// var popMargTop = ($(loginBox).height() + 24) / 2; 
		// var popMargLeft = ($(loginBox).width() + 24) / 2; 
		
		// $(loginBox).css({ 
		// 	'margin-top' : -popMargTop,
		// 	'margin-left' : -popMargLeft
		// });
		
		// // Add the mask to body
		// $('body').append('<div id="mask"></div>');
		// $('#mask').fadeIn(300);
		$('#myModal').modal('show');
		
		return false;
	});
	
	// When clicking on the button close or the mask layer the popup closed
	$('#closebtn').click(function() { 	  
		closePopUp();
	});