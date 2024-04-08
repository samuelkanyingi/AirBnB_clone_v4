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
