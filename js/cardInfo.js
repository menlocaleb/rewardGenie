/* Card Info module for Reward Genie
   Team Yellow, May 2014

   This module allows access to our card database, and the
   binlist.net API for looking up card info. It is the centralized API
   for the rest of JS code to access card information.

   This file assumes access to jQuery library.
 */


var cardInfo = (function() {
	var module = {};

	// Class to store card info
	// TODO make a parse object for easy integration with Parse.
	module.Card = function() {

	};

	module.lookupCardNumber = function(cardNum) {
		// TODO verify that number is only 6 digits
		var format = 'json';
		// return Promise interface to user
		return $.get("http://www.binlist.net/" + format + "/" + cardNum);

	};

	return module;

})();
