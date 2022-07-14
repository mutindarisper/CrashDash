import Vue from 'vue'
import App from './App.vue'
import VueTour from "vue-tour";
import router from './router'
import store from './store'

// eslint-disable-next-line
require("vue-tour/dist/vue-tour.css");

Vue.config.productionTip = false

new Vue({
  router,
  store,
  VueTour,
  render: h => h(App)
}).$mount('#app')


hospitals = L.geoJSON(null, //////////////////// LOAD LOAD LOAD////////////////////////
    {
    pointToLayer: function(feature, latlng) {
            switch (feature.properties.CATEGORY){
                 case 'GENERAL':

                  var myIcon = new L.icon({
                    iconUrl: 'img/marker.png', 
                    iconSize:     [25, 30], // width and height of the image in pixels
                    shadowSize:   [35, 20], // width, height of optional shadow image
                    iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                    shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                    popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });
                    return L.marker(latlng, { icon: myIcon });

               
               
                case 'GYNAECOLOGIST':
                    var gynIcon = new L.icon({
                        iconUrl: 'img/gyna.png', 
                        iconSize:     [70, 50], // width and height of the image in pixels
                        shadowSize:   [35, 20], // width, height of optional shadow image
                        iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                        shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                  });
                
                     return L.marker(latlng, {icon: gynIcon});
                
                 case 'DENTAL':
                    var dentIcon = new L.icon({
                        iconUrl: 'img/dental.png', 
                        iconSize:     [70, 60], // width and height of the image in pixels
                        shadowSize:   [35, 20], // width, height of optional shadow image
                        iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                        shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });
               
                    return L.marker(latlng, {icon: dentIcon});
                
                
                case 'ULTRASOUND':
                    var scanIcon = new L.icon({
                        iconUrl: 'img/ultra.png', 
                        iconSize:     [100, 100], // width and height of the image in pixels
                        shadowSize:   [35, 20], // width, height of optional shadow image
                        iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                        shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                        popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                  });
    
                     return L.marker(latlng, {icon: scanIcon});

               }
        },
        onEachFeature: function (feature, layer) {
    layer.bindPopup('<strong>'+feature.properties.NAME+'</strong><p><strong>Type: </strong>'+feature.properties.TYPE+'</p><strong>Facility: </strong>'+feature.properties.FACILITY+'</p></p><strong>Emergency Contact: </strong><a href="tel:'+feature.properties.CONTACT+'" target="_blank" style="text-decoration:none; color:#e04d21">CALL</a></p></p><strong>Navigate: </strong><a href="https://maps.google.com/?q='+feature.properties.LATITUDE+','+feature.properties.LONGITUDE+'" target="_blank" style="text-decoration:none; color:#e04d21">GO</a></p>');
  }
}).addTo(map);
