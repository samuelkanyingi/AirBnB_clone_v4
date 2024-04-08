$(document).ready(function () {
  const selectedAmenities = {};
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data_id');
    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = true;
    } else {
      delete selectedAmenities[amenityId];
    }
    const amenitiesList = Object.keys(selectedAmenities).join(', ');
    $('#amenities').text(amenitiesList);
  });
});
$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
	 if (data.status === 'OK') {
		 $('#api_status').addClass('available');
	 } else {
		 $('#api_status').removeClass('available');
	 }
});
// Request to fetch places data from the API
fetch('http://0.0.0.0:5001/api/v1/places_search/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Loop through the result and create article tags for each place
    data.forEach(place => {
      const article = document.createElement('article');
      article.innerHTML = `
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">${place.description}</div>
            `;
      document.querySelector('.places').appendChild(article);
    });
  })
  .catch(error => console.error('Error:', error));
