window.onload = () => {
  
  // markCurrentLocation();
  setInitialMap();
  
  const mySaloonAddress = document.getElementById('fullAddress');
  const autocompleteSearch = new google.maps.places.Autocomplete(mySaloonAddress);
  autocompleteSearch.setComponentRestrictions({ country: ['br'] });

  mySaloonAddress.onfocusout = async function () {
    const value = mySaloonAddress.value;
    if(value.length > 10) {
      const geocodeRes = await geocode(value);
      if (geocodeRes.data.results.length) {
        const coords = geocodeRes.data.results[0].geometry.location;
        addSingleMarker(coords);
        document.querySelector('#saloonPosition').value = JSON.stringify([coords.lat, coords.lng]);
        console.log(document.getElementById('saloonPosition').value);
  
      } else {
        document.getElementById('error-message').innerHTML = 'Informe um endereço completo';
      }
    }
  };
};
