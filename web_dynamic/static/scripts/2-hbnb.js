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
