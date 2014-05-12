/* Main JS file for Reward Genie */



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

	initialize();
	$('.dropdown-toggle').dropdown();
	$('#geolocationError').hide();
	//$('#map-canvas').show();
});




function closePopUp(){
	$('#signUpPop').fadeOut(300 , function() {
		$('#mask').remove();  
		}); 	
}


$("signupform").submit(function(e){
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
		var loginBox = $(this).attr('href');

		//Fade in the Popup and add close button
		$(loginBox).fadeIn(300);
		
		//Set the center alignment padding + border
		var popMargTop = ($(loginBox).height() + 24) / 2; 
		var popMargLeft = ($(loginBox).width() + 24) / 2; 
		
		$(loginBox).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		// Add the mask to body
		$('body').append('<div id="mask"></div>');
		$('#mask').fadeIn(300);
		
		return false;
	});
	
	// When clicking on the button close or the mask layer the popup closed
	$('#closebtn').click(function() { 	  
		closePopUp();
	});