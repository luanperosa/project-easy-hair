let pos;
let markers = [];

function initMap() {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  } else {
    // Browser doesn't support Geolocation
    // handleLocationError(false, infoWindow, map.getCenter());
    pos = {
      lat: -23.561682,
      lng: -46.660170,
    };
  }

  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -23.561682, lng: -46.660170 },
    zoom: 17,
    gestureHandling: 'cooperative',
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      mapTypeIds: ['roadmap', 'satellite'],
    },
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }],
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ],
  });
}

// former function markCurrentLocation 
function setInitialMap() {
  // const infoWindow = new google.maps.InfoWindow();
  // infoWindow.setPosition(pos);
  // // infoWindow.setContent('Você está aqui');
  // // infoWindow.open(map);
  addSingleMarker(pos);
  map.setCenter(pos);
}

async function addSingleMarker(coords, newLocalSearch) {
  deleteMarkers();

  const marker = new google.maps.Marker({
    position: coords,
    map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon,
  });
  map.setCenter(coords);
  markers.push(marker); /* WHY? */
  marker.addListener('click', toggleBounce);

}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}  

function addMarker(places) {
  infoWindow = new google.maps.InfoWindow();
  const bounds = new google.maps.LatLngBounds();
  const contentString = [];
  const marker = [];
  for (let i = 0; i < places.length; i += 1) {
    const place = places[i];

    contentString[i] = `
    <div class = 'marker-title'>${place.title}</div>
    <div class = 'marker-address'>${place.address}</div>
    `;
    marker[i] = new google.maps.Marker({
      position: place.coord,
      map,
    });

    marker[i].addListener('mouseover', () => {
      infoWindow.setContent(contentString[i]);
      infoWindow.open(map, marker[i]);
    });

    marker[i].addListener('click', () => {
      console.log(place);
    });

    marker[i].addListener('mouseout', () => {
      infoWindow.close();
    });
    bounds.extend(places[i].coord);
  }
  map.fitBounds(bounds);
}

function addMarkerPlaces(places) {
  const infoWindow = new google.maps.InfoWindow();
  const bounds = new google.maps.LatLngBounds();
  const contentString = [];
  const marker = [];
  for (let i = 0; i < places.length; i += 1) {
    const place = places[i];
    const position = place.geometry.location;
    // console.log(place.name, place.formatted_address);
    contentString[i] = `
    <div>${place.name}</div>
    <div>${place.formatted_address}</div>
    `;
    marker[i] = new google.maps.Marker({
      position: position,
      map,
    });

    marker[i].addListener('mouseover', () => {
      infoWindow.setContent(contentString[i]);
      infoWindow.open(map, marker[i]);
    });

    marker[i].addListener('click', () => {
      placeDetails(place.place_id);
    });

    marker[i].addListener('mouseout', () => {
      infoWindow.close();
    });
    bounds.extend(places[i].geometry.location);
  }
  map.fitBounds(bounds);
}

function deleteMarkers() {
  if (typeof markers !== 'undefined') {
  // if (markers.length > 0) {
  for (let i = 0; i < markers.length; i += 1) {
    markers[i].setMap(null);
  }
  markers = [];
  }
}

async function geocode(location) {
  //   try {
  //     geocoder.geocode({
  //     address: location,
  //     region: 'br',
  //   }, (result, status) => {
  //     if (status == 'OK') {
  //       return result;
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  // }  
  try {
    return await axios
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: location,
          key: 'AIzaSyCQpuEpO4UtIbYaCSI_-v9_bBuxOgTMbKw',
          region: 'br',
        },
      });
  } catch (error) {
    console.log(error);
  }
}

async function findPlaces(text) {
  const request = {
    location: pos,
    // radius: '500',
    query: text,
    // bounds: 'strictbounds',
    // type: ['restaurant'],
  };
  const service = new google.maps.places.PlacesService(map);
  await service.textSearch(request, (places, status) => {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      addMarkerPlaces(places);
      document.getElementById('queryResult').innerHTML = '';
      places.forEach((place, index) => {
        console.log('places', place);
        // <li class="addPlace">${place.name} ${place.formatted_address}
        // <input type="hidden" value="${index}">
        // <button class="fillListButton btn waves-effect waves-light">Adicionar este endereço</button>
        // </li>

        document.getElementById('queryResult').innerHTML += `
        <tr>
          <td>${place.name}</td>
          <td>${place.formatted_address}</td>
          <td class="fillListButton btn waves-effect waves-light" value="${index}">Adicionar</td>  
        </tr>
        `;
      });
      const addButton = document.querySelectorAll('.fillListButton');
      addButton.forEach((button, index) => {
        button.onclick = function () {
          // console.log(index);
          placeDetails(places[index].place_id);
          map.setCenter(places[index].geometry.location);
          // addSingleMarker(places[index].geometry.location);
          document.getElementById('map').scrollIntoView();
        };
      });
    }
  });
}


function placeDetails(id) {
  const request = {
    placeId: id,
    // fields: ['name', 'rating', 'formatted_phone_number', 'geometry'],
  };

  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);

  function callback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log('place details', place);
      const coord = JSON.parse(JSON.stringify(place.geometry.location).toString());
      console.log('place coord', coord);
      let workTime = '';
      place.opening_hours.weekday_text.forEach((day) => {
        workTime += `${day.toString()}\n`;
      });
      document.getElementById('clearForm').innerHTML = `
      <button id="clearFormBtn" class="btn btn-info">Limpar Cadastro</button>
      `;
      document.getElementById('clearFormBtn').onclick = function () {
        clearFields();
      };
      document.getElementById('saloonName').value = place.name;
      
      document.getElementById('contactNumber').value = place.formatted_phone_number;
      document.getElementById('fullAddress').value = place.formatted_address;
  
      document.getElementById('businessHours').value = workTime;
      document.getElementById('saloonPosition').value = JSON.stringify([coord.lng, coord.lat]);
      console.log(document.getElementById('saloonPosition').value);
      document.getElementById('placeID').value = place.place_id;
      document.getElementById('ratingFromGoogle').value = place.rating;
      console.log(typeof (place.photos), typeof (typeof (place.photos)));
      if (typeof (place.photos) !== 'undefined') {
        place.photos.forEach((photo) => {
          document.getElementById('imageGallery').innerHTML += `
          <input type="hidden" class="imageGalleryClass" name="imageGallery[]" type="text" value="${photo.getUrl()}">
          `;
        });
      }
      console.log(typeof (place.reviews));
      if (typeof (place.reviews) !== 'undefined') {
        place.reviews.forEach((review) => {
          console.log(review);
          const {
            author_name, rating, relative_time_description, text,
          } = review;
          const reviewHeader = `{
          *name*:*${author_name}*, 
          *rating*:*${rating}*,
          *when*:*${relative_time_description}*
          }`;
          const reviewText = text;

          document.getElementById('reviewsFromGoogle').innerHTML += `
          <input type="hidden" class="reviewsFromGoogleClass" name="reviewsFromGoogle[]" type="text" value="${reviewHeader}">`;
          document.getElementById('reviewsFromGoogle').innerHTML += `
          <input type="hidden" class="reviewsFromGoogleClass" name="reviewsFromGoogleText[]" type="text" value="${reviewText}">`;
          // console.log(reviewString, typeof (reviewString));
          console.log(document.getElementById('reviewsFromGoogle'));
        });
      }
    }
  }
}

function clearFields() {
  document.getElementById('saloonName').value = '';
  document.getElementById('contactNumber').value = '';
  document.getElementById('fullAddress').value = '';
  document.getElementById('businessHours').value = '';
  document.getElementById('saloonPosition').value = '';
  document.getElementById('placeID').value = '';
  document.getElementById('coverPhoto').value = '';
  document.getElementById('ratingFromGoogle').value = '';
  document.getElementById('imageGallery').innerHTML = '';
  document.getElementById('reviewsFromGoogle').innerHTML = '';
}