window.onload = () => {
  
  // markCurrentLocation();
  setInitialMap();
  
  const inputSearchAddress = document.getElementById('inputAddressQuery');
  const autocompleteSearch = new google.maps.places.Autocomplete(inputSearchAddress);
  autocompleteSearch.setComponentRestrictions({ country: ['br'] });

  // const addAddress = document.getElementById('Endereço');
  // console.log('this is the addAddress', addAddress);
  // const autocompleteAddress = new google.maps.places.Autocomplete(addAddress);
  // autocompleteAddress.setComponentRestrictions({ country: ['br'] });

  document.getElementById('searchAddressQuery').onclick = async function (event) {

    try {
      event.preventDefault();
      const address = document.getElementById('inputAddressQuery').value;
      console.log('address', address);
      findPlaces(address);
      
      // const geocodeRes = await geocode(address);
      // console.log('typeof geocodeRes', typeof(geocodeRes));
      // const saloonLocation = geocodeRes.data.results[0].geometry.location; /* const coord = response.data.results[0].geometry.location; */
      // const formattedAddress = geocodeRes.data.results[0].formatted_address;
      // const placeId = geocodeRes.data.results[0].place_id;
      // addSingleMarker(saloonLocation); /* addSingleMarker(coord); */
      // map.setCenter(saloonLocation);
      // await placeDetails(placeId);
      // await placeDetails(placeId);
      // document.getElementById('formatted-address').innerHTML += `
      // ${formattedAddress}
      // `;
      console.log('response', response, saloonLocation, formattedAddress, placeId);
      // addMarkerPlaces(places);
      findPlaces(address);
      document.getElementById('inputAddressQuery').value = '';
    } catch (error) {
      console.log(error);
    }
  };
};
