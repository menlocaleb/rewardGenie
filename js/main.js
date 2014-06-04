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
$("#addCreditCardToUser").hide();
$(document).ready(function() {

	if (currentUser) {
		getUserCards(function(data) {
			usersCards = data;
		});
	}


	$("#nav-current-cards").click(function() {
		getUserCards(function(list) {

			var html = "";
			var childNode  ='';
			
			$("#cardLists").empty();

			for (var i = 0; i < list.length; i++) {
				html = '<h3 style="color: #203D6C;">'+list[i].getBank() + '<br/>' + list[i].getCardName()+"</h3>";
				html += '<p style="font-size: 14pt;">' + list[i].getOfferDescription() + '</p>';
				
				//console.log(list[i]);
				childNode = '<div '+ 'id = '+list[i].id+' class="col-md-6 col-md-offset-3 card-list-div">'+'<br>'+ html
				+'<button class="delete-card-button" onclick= dofordrop(this) ><span style="color:#FFFFFF;">X</span></button>'
				+'</div>';
				$("#cardLists").append(childNode);
			}

			if (list.length < 1) {
				$("#cardLists").append("<div class='col-md-6 col-md-offset-3'><h4> Please add a credit card!</h4></div>");
			}




		});
	});

	$("#getCardDetailsButton").click(function() {
		cardInfo.lookupCardNumber($("#cardNumberInput").val())
		.done(function(data) {
			if (data.bank.valueOf("")||data.card_type.valueOf("")){


				var innerHtml = "Bank: " + data.bank + "<br/> Card Brand: " + data.brand+"<br/> Card Type: " + data.card_type
								+"<br/> Card Category: " + data.card_category+ "<br/> Country Name: "+data.country_name ;
				//console.log(data);
				$("#cardInfoOutput").html(innerHtml);

			}
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
	$("#rewards").hide();
	
	//$('#login').css('display',"none!important");
	if (!currentUser) {
		$('#login').hide();
		$("#tabControl").hide();
		$("#signInForm").show();
		$("#mapview").hide();
	}
	else {
		handleLogin(currentUser);
	}


	$("#inputCreditCard").keyup(function(){
		var inputCreditCard = $('#inputCreditCard');
		if (inputCreditCard.val().length != 6) {
			$("#addCreditCardToUser").hide();
			$("#cardInfoOutput").hide();
			$("#rewards").hide();
			$("#usercardInfoOutput").prop("class","");
			$("#usercardInfoOutput").html("");
		}
		else if (( inputCreditCard.val() != inputCreditCard.data('val')) ||
				(inputCreditCard.val() == prevString ) ){
			//console.log("happened!");
			inputCreditCard.data('val',inputCreditCard.val());
			addCreditCard(inputCreditCard.val());
			$("#rewards").show();
			prevString = inputCreditCard.val();
			
		}
		// !!!! WILL NEVER REACH HERE EVER B/C OF FIRST IF STATEMENT
		else if (inputCreditCard.val() === "") {
			$("#usercardInfoOutput").html("");
			$("#addCreditCardToUser").hide();
		}


	});

	$("#selectCard").change(function() {
		var text = $("#usercardInfoOutput").html();
		var lines = text.split("<br>");

		if (lines[0].substr(0,4) == "Card") {
			lines.splice(0,1);
		}
		var selection = $(this).val();
		if (selection && selection !== 'Choose a card...') {
			$("#usercardInfoOutput").html("Card: " + selection + "<br>" + lines.join("<br>"));

			// enable add button
			$("#addCreditCardToUser").removeAttr('disabled');

		}
		else {
			$("#addCreditCardToUser").attr('disabled','disabled');
		}
	});
});

$("#logOutButton").click(function(){
		handleLogin(currentUser);
		document.location.href = "index.html";
});


function closePopUp(){
	$('#myModal').modal('hide');
	//$('#signupform').reset();
	resetForm($('#signupform'));
    //$("#signupform").closest('form').find("input[type=text], textarea").val("");

}



function resetForm($form) {
    $form.find('input:text, input:password, input:file, select, textarea').val('');
    $('#email').val("");     
}




$("#signupform").submit(function(e){
    
    var fields = $(this).serializeArray();
    addUser(fields); 
	closePopUp();
	return false;

  });


/**
	Submmit your log in form, and handle the input
*/
$('#signInForm').submit(function(e){

	var fields = $(this).serializeArray();

	userLogin(fields);
	//document.location.href = "index.html";
	return false;
});


/**
	It's the X button for removing your current card.
*/
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
	
	$('#myModal').modal('show');
	resetForm($('#signupform'));
	
	return false;
});

// When clicking on the button close or the mask layer the popup closed
$('#closebtn').click(function() { 	  
	closePopUp();
});