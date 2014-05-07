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
});