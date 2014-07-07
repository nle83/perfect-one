//event handlers
$(document).ready(function(){
	// bring in the search prompt
	$("#search-results").find(".prompt").fadeIn(1000);

	//click event for search button
	$("#search").click(function(){
		//grab input from search box
		var input = $("#searchtext").val();
		//search
		search(input);
		//clear search text
		$("#searchtext").val("");
	});

	//keyup event for search
	$("#searchtext").keyup(function(e){
		if(e.which == 13){
			//grab input from search box
			var input = $("#searchtext").val();
			//search
			search(input);
			//clear search text
			$("#searchtext").val("");
		}
	});

	//click event for add button
	$("#add").click(function(){
			if(favCount <= 3){
				//fade out favorites prompt
				$("#favorites").find(".prompt").fadeOut(1000);
				//add favorite element

				//remove search result

				//iterate favorites count
				favCount++;
			}
			else alert("3 favorites maximum");
	});

	//click event for remove button


	//click event for reset button
	$("#reset").click(function(){
		//clear out favorites

		//clear out search results

		//add back search prompt
		$("#search-results").find(".prompt").fadeIn(1000);
	})
});

//API KEY
var API_KEY = '829s97zx5apo0thppqhts1ys';
var favCount = 0;

//building search results
function showListing(result){

	// clone our result template code
	var listing = $('.template .result').clone();
	
	// set the title of the listing
	var title = listing.find('.title');
	title.text(result.title);

	// price
	var price = listing.find('.price');
	price.text(result.price);

	// listing ID
	var id = listing.find('.list-id');
	id.attr("href", result.url);
	id.text("List ID: " + result.listing_id);
	
	listing.attr("display", "block");

	return listing;
}

function showSearchResults(query, resultNum) {
	var results = resultNum + ' results for ' + query;
	return results;
};

//search function with api calls
function search(string){
	//hide search prompt
	$("#search-results").find(".prompt").fadeOut(1000)

	//produce result array
	var result = $.ajax({
	url: "https://openapi.etsy.com/v2/listings/active.js?api_key=" + API_KEY + "&keywords=%" + string + "%",
	dataType: "jsonp",
	type: "GET"
	})
	//once call is done, process results
	.done(function(response){
	
	searchResults = showSearchResults(string, response.results.length);

		$('#results-num').text(searchResults);

		$.each(response.results, function(i, item) {
			var listing = showListing(item);
			console.log(listing);
			$('#search-results').append(listing);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('#search-results').append(errorElem);
	});

	//show favorites prompt
	$("#favorites").find(".prompt").fadeIn(1000);

};

//adding favorites
function addFav(searchResult){

}