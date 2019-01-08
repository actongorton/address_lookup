function searchInput(address_query) {
  // attempt to fetch list from the server given the input as a directory
  try {

    // split the address by space, will use the first part (presumably numbers) to query the server
    // NOTE: any possibilty of an address NOT starting with numbers?
    var parsed_address = address_query.split(' ');

    // only update awesomplete if user has finished typing the first part of the address (the numbers)
    if (address_query.indexOf(' ') >= 0 && parsed_address[1] === '') {

      // send request to server
      var xhReq = new XMLHttpRequest();
      xhReq.open("GET", "/Address Lookup/data/" + parsed_address[0] + "/data.csv", false);
      xhReq.send(null);

      // assign the response to a variable
      var server_response = xhReq.responseText;

      // test the response
      console.log('response:', server_response);

      if (server_response.length > 0) {

        // parse the csv results into an array
        var search_terms = [];
        var lines = server_response.split('\n');
        for (var i = 0; i < lines.length; i++) {
          search_terms.push(lines[i].split(',')[0])
        }

        // load awesomplete with the results
        awesomplete.list = search_terms;

      }
    }


  } catch (error) {
    console.error('error:', error)
  }

}

// assign the search input dom to a variable
var search_input = document.getElementById('address_lookup');

// instantiate awesomplete given the search_input dom value
var awesomplete = new Awesomplete(search_input, {
  minChars: 0
});

// trigger when text is entered into the input box with an id of `ward_lookup`
search_input.addEventListener('input', () => {
  // grab the values of the search_input
  var address_query = document.querySelectorAll('input[id="address_lookup"]')[0].value;
  // pass search query to the searchInput() function
  searchInput(address_query);
});
