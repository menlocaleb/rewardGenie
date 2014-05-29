/* Main JS file for Reward Genie */

/*
BoA
Earn 1% cash back on purchases, 2% cash back at grocery stores and 3% cash back on gas

Chase
5% cash back on up to $1500 in combined purchases at Restaurants and LOWES

Discover
5% Cashback Bonus at Home Improvement Stores, Furniture Stores, plus Bed Bath & Beyond on up to $1,500 in purchases
*/

// Localize search
// x button to clear search



// Start of execution
var prevString = "";
$(document).ready(function() {

	if (currentUser) {
		getUserCards();
	}


	$("#nav-current-cards").click(function() {
		getUserCards(function(list) {

			var html = "";
			var childNode  ='';
			// for (var i = 0; i < list.length; i++) {
			// 	html += "<h2>"+list[i].getCardName()+"</h2>";
			// }
			// $("#cardLists").html(html);
			$("#cardLists").empty();

			for (var i = 0; i < list.length; i++) {
				html = '<span style  = "font:12oz;">'+list[i].getCardName()+"</span>";
				//childNode = '<div '+ 'id = '+list[i].getId()+'><p>'+html+'</p>'
				console.log(list[i]);
				childNode = '<div '+ 'id = '+list[i].id+'>'+'<br>'+html
				+'<button style = "float:right;" onclick= dofordrop(this) >X</button>'
				+'</div>';
				$("#cardLists").append(childNode);
			}




		});
	});

	$("#getCardDetailsButton").click(function() {
		cardInfo.lookupCardNumber($("#cardNumberInput").val())
		.done(function(data) {
			if (data.bank.valueOf("")||data.card_type.valueOf(""))
				$("#cardInfoOutput").html("Bank: " + data.bank + "<br/> Card Type: " + data.card_type);
			else {
				$("#cardInfoOutput").html("The Bank infomation is not available.");
			}
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
		$("#tabControl").hide();
		$("#signInForm").show();
	}
	else {
		handleLogin(currentUser);
	}


	$("#inputCreditCard").keyup(function(){
		var inputCreditCard = $('#inputCreditCard');
		if (inputCreditCard.val().length != 6) {
			$("#usercardInfoOutput").html("Please Input An Six-digit Number.");
			$("#usercardInfoOutput").prop("class","alert alert-danger");
			$("#addCreditCardToUser").hide();
		}
		else if (( inputCreditCard.val() != inputCreditCard.data('val')) ||
				(inputCreditCard.val() == prevString ) ){
			console.log("happened!");
			inputCreditCard.data('val',inputCreditCard.val());
			addCreditCard(inputCreditCard.val());
			prevString = inputCreditCard.val();
			
		}
		else if (inputCreditCard.val().valueOf("")) {
			$("#usercardInfoOutput").html("");
			$("#addCreditCardToUser").hide();
		}


	});


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



function dofordrop(x){
	var card = $(x).parent();
	$(card).remove();
	removeCards(card);
}




function showTabBar(){
	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
	  e.target // activated tab
	  e.relatedTarget // previous tab
	});

	$('#myTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
	})
}



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