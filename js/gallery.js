
jQuery(document).ready(function() {

    jQuery.get("getListOfImages.php", function(data) {
	// add an entry for each
	for (var i = 0; i < data.length; i++) {
	    jQuery('#content').append("<div class='image' id='" + data[i] + "</div>");
	}
    });
    
    jQuery('#content').append("<p>All the drawings we can see</p>");
});
