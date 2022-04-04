mapboxgl.accessToken = 'pk.eyJ1IjoiYnR5eW4iLCJhIjoiY2wxOW9rM2h0MHA2cjNicHMwejRqNDY4diJ9.Pw3Sao5OcY8HWcTBCi_DPQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/btyyn/cl1bkpg8f000d14o37itttwpd',
  center: [-123.09694484674775, 49.24220210276712], // starting position
  zoom: 9 // starting zoom
});

// Create a default Marker and add it to the map.
// const marker1 = new mapboxgl.Marker()
//   .setLngLat([-123.09694484674775, 49.24220210276712])
//   .addTo(map);

/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on('click', (event) => {
  // If the user clicked on one of your markers, get its information.
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['vancouver-restaurants'] // replace with your layer name
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];
  /* 
      Create a popup, specify its options 
      and properties, and add it to the map.
    */
  const popup = new mapboxgl.Popup({
      offset: [0, -15]
    })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h6>${feature.properties.title}</h6><p>${feature.properties.address}</p><p>${feature.properties.details}</p>`

    )
    .addTo(map);
});