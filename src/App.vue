<template>
  <div id="app">

    <div class="navbar">
      <div class="dash_logo">
        <img src="./assets/images/white_crash.svg" alt="">
      </div>

      <div class="tagline">
        Providing Information on Major Blackspots in Kenya
      </div>

      <div class="links">
        <a class="home"  href="https://www.stjohnkenya.org/" target="_blank" >Home</a>
        <div class="dashboard">Dashboard</div>
        <div class="mapographics"
        @click="download_mapographics"
        >Mapographics</div>


      </div>

      <div class="logo2">
        <img src="./assets/images/white-logo.png" alt="">
      </div>

    </div>


<!-- display analysis panel -->
<div class="start" @click="handle_selected_component('analysis')">
  <span class="begin">Start Analysis</span>
   <img class="menu" src="./assets/images/menu.svg"  alt="">
</div>
   

    <div class="analysis" v-if="analysis">
      <img class="close_analysis"  @click="close_container('analysis')" src="./assets/images/close.svg" alt="">

  <span class="region">Region</span>

  <!-- test for custom select -->
   <CustomSelect
      :options="this.counties"
      :default="'Select a region'"
      class="select_region"
      @input="displayToKey($event);getRoutesList();getCausesList()"
    />

     <span class="routes">Road</span>
   <CustomSelect
      :options="this.routes"
      :default="'Select a route'"
      class="select_route"
      @input="display_route_name($event);getRoutesList()"
    />
     <span class="causes">Cause</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select a cause'"
      class="select_cause"
      @input="display_cause_name($event);getCausesList()"
    />

      <span class="hazard">Hazard</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select hazard'"
      class="select_hazard"
      @input="display_cause_name($event);getCausesList()"
    />

    <span class="mitigations">Mitigation</span>
     <CustomSelect
      :options="this.causes "
      :default="'Select mitigation'"
      class="select_mitigation"
      @input="display_cause_name($event);getCausesList()"
    />

      <!-- <span class="facilities">Health Facilities</span>
   <CustomSelect
      :options="'' "
      :default="'Select a category'"
      class="select_facility"
      @input="displayToKey($event)"
    /> -->

    <button class="stats" @click="handle_selected_component('chart_container')" type="button">Load Statistics</button>

    <!-- alert panel -->

    <div class="alert_panel" v-if="alert_panel">
      <span class="info_title">Click the point on the map to display the data </span>
      <button class="alert_button" type="button"  @click="close_container('alert_panel')">OK</button>

    </div>


<!-- <span class="proximity">Proximity</span>
<br>
<span class="distance">Distance (km)</span>
<input type="number" id="points" name="points" step="1"> 
<button class="query" type="button">Query</button>


<span class="roads">Road Network</span>
<div class="inputs">
 <input type="checkbox" name="" id="camps">
       <label for="">Class A</label><br>

      <input type="checkbox" name="" id="party_offices">
       <label for="">Class B</label><br>

      <input type="checkbox" name="" id="churches">
       <label for="">Class C</label><br>

      <input type="checkbox" name="" id="markets">
       <label for="">Class D</label><br>
   
</div> -->


  


    
    </div>

    <div class="chart_container" v-if="chart_container">
        <img class="close_chart_container"
        src="./assets/images/close.svg"
        @click="close_container('chart_container')"
         alt="" >
         <div class="title">
          Summary Statistics
         </div>

         <div class="county_chart">
          <HotspotsDoughnut :height="230" :width="300" />
         </div>
         <div class="chart_text">
          Statistics showing number of blackspots per county. 
          
          <b>Meru</b> county leads, with <b>96</b> blackspots, followed by <b>Nyeri</b>
           county with <b>69</b> blackspots, <b>Laikipia</b>, with <b>65</b>, <b>Kiambu</b> having <b>40</b> 
           and <b>Embu</b> county having <b>31</b>.
        

         </div>

    </div>


    <Hotspots
     @school_data="handle_point_data" 
     />


     <!-- display popup info panel -->

     <div class="info" v-if="info">
       <img class="close_info"  @click="close_container('info')" src="./assets/images/close_black.svg" alt="">
       
 <span class="info_title">Click a point <br> on the map <br> to display  data </span>
    
       <br>
       <br>
      <div class="name"  style="display: inline-block; font-size: 14px; position: relative; left: 0.5vw"></div>
      <br>
      <br>
      <div class="county" style="display: inline-block; font-size: 14px;  position: relative; left: 0.5vw"></div>
      <br>
      <br>
      <div class="cause" style="display: inline-block; font-size: 14px; height: 5px; position: relative; left: 0.5vw"></div>
      <br>
      <br>
      <div class="mitigation" style="display: inline-block; font-size: 14px;  height: 5px;  position: relative; left: 0.5vw" ></div>
      <br>
      <br>
      <!-- <div class="separator"></div> -->
      <!-- <br> -->
      
       <br>
       <div class="media1"></div>
       <p class="picture_title"></p>
      
       <img src="" class="media" controls> 
       
       <p class="video_title"></p>
       <video src="" class="video_" autoplay=false style="display: none" controls>
      
       </video>
       


  </div>

    <div class="map" id="map" style="position:relative; top:11vh; height: 87vh; width: 100%;">

      <div class="map_controls">
        <div class="zoomin_tool">
          <img
            src="./assets/images/zoomin.svg"
            alt=""
            title="Zoom in"
            @click="zoom_in"
          />
        </div>

        <div class="zoomout_tool">
          <img
            src="./assets/images/zoomout.svg"
            alt=""
            title="Zoom out"
            @click="zoom_out"
          />
        </div>

        <div class="basemaps">
          <img
            src="./assets/images/layers.svg"
            alt=""
            @mouseover="base_map_ctrl_selections = true"
            @mouseleave="handle_baseLayers"
          />
        </div>

        <div class="download">
          <img
            src="./assets/images/download.svg"
            alt=""
            title="Download map"
            @click="screenshot"
            
          />
        </div>
       

       <div class="info_icon">
          <img
            src="./assets/images/info.svg"
            alt=""
            title="More info"
            @click=" handle_selected_component('info')"
            
          />
        </div>

        <div class="dimension">
          <img
            src="./assets/images/3d.svg"
            alt=""
            title="View 3D"
           @click="handle_selected_component('googlemap_container') ;setupGoogleMap()"
            
          />
        </div>
      </div>


      <div
        class="base_map_ctrl_selections"
        v-if="base_map_ctrl_selections"
        @mouseover="
          (base_map_ctrl_selections = true), (base_map_ctrl_cliked = true)
        "
        @mouseleave="
          (base_map_ctrl_selections = false), (base_map_ctrl_cliked = false)
        "
      >
        <div v-for="base_map in Object.keys(baseMaps)" :key="base_map">
          <div class="base_map" @click="change_base_map(base_map)">
            <div class="base_map_name">{{ base_map }}</div>
          </div>
        </div>
      </div>


      

    </div>
    <!-- map container close -->

   


    <!-- 3d view -->
    <div class="googlemap_container" v-if="googlemap_container">
 
          <div id="map2"  >
                      
                </div>
                <button class="map_button" type="button" style="" @click="close_map_container('googlemap_container')"><b>Close Map</b> </button>
                  
                <div id="pano"></div>
    </div>
      

    <!-- chart loader -->

   
   
  </div>
</template>
<script>
import "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import axios from "axios"
import $ from "jquery";
import baseLayers from "./Helpers/baseLayers";
import CustomSelect from "./components/CustomSelect.vue"
import Hotspots from './components/Hotspots.vue'
import HotspotsDoughnut from './components/charts/HotspotsDoughnut.vue'
import { Loader } from '@googlemaps/js-api-loader';
import "leaflet.smooth_marker_bouncing"
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import "leaflet.browser.print/dist/leaflet.browser.print.min.js"

delete Icon.Default.prototype._getIconUrl;
// Icon.options.shadowSize = [0,0];
Icon.Default.mergeOptions({
  iconRetinaUrl: require("../src/assets/images/marker.svg"), //../src/assets/images/red-pin.svg
   iconUrl: require("../src/assets/images/marker.svg"),
  // iconUrl: require("../src/assets/images/red-pin.svg"),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png' marker  D:\SNAKE_BITES\Kenya_Snakebites_Information_Platform\src\assets\images\hosp.svg),
  iconSize:[18, 18],
  shadowSize: [0, 0],
});



var baseurl = 'http://192.168.1.41:8100'

// console.log(this.img_url, 'url outside')

export default {
   name: "App",
   components:{
    CustomSelect,
    Hotspots,
    HotspotsDoughnut

   },
   data() {

    return{
       center: [0.02, 37.8582273], // set initial map center
      map: null, //instance of map object,
      // map2: false,
      googlemap_container: false,
      base_map_ctrl_selections: false, //show or hide base layers
      base_map_ctrl_cliked: false,
      baseMaps: {},
      current_geojson: null,
      current_road: null,
      current_hotspots: null,
      points_layerGroup:null,
      markers: null,
      current_point:[],
      point_hotspot: null,
      chart_container: false,
      info: false,
      analysis: true,
      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      selected_county: '',
      routes: [],
      causes:[],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],
      charts: false,
      img_url: '',
      alert_panel: false

    }

   },
   mounted() {

    
   
    this.setupLeafletMap();
    
    // this.load_all_hotspots();
      this.getRoutesList();
  this.onEachPoint();

    // this.handle_point_data();
    
   },
  

   methods: {

    download_mapographics() {
      const doc = new jsPDF();
       $('.mapographics').click(function () {
        doc.save('sample-file.pdf');
    });


    },



      screenshot() {
      domtoimage.toBlob(document.getElementById("map")).then(function (blob) {
        saveAs(blob, "map.png");
      });
    },


    handle_point_data(val) {
      // console.log("I HAVE ARRIVED")
      // if (this.points_layerGroup !== null) {
      //   window.markers.clearLayers();
      // }

      window.markers = new L.featureGroup();
      this.points_layerGroup = window.markers;
      // var radius = this.pointStyle;

      var points = val; //.features[0]['geometry'] dewewewe
      console.log(points, 'POINTS' ) //WORKING

      this.map.createPane("rasters");
      this.map.getPane("rasters").style.zIndex = 500;

      Object.entries(points.features).forEach(([key, value]) => {

        // console.log(points.features, 'POINTS FEATURES' ) //WORKING

        var cordi = value.geometry.coordinates[0] 

        var cordinates = [cordi[1],cordi[0]]
        // console.log( key , 'KEYS', cordinates )
        // thisiconUrl
        // console.log(value.properties.Reasons, 'REASONS') Overspeeding
        var point_color = '#099f46'
        if (value.properties.Reasons === 'Curve preceeding a hill, blindspot, lack of signage'){
         
          point_color = "#fcba03"
          
         
                }

          if (value.properties.Reasons === 'Lack of signage'){
         
          point_color = "#03fc52"
          
         
                }
          if (value.properties.Reasons === 'Overspeeding'){
         
          point_color = "#3003fc"
          
         
                }

        if (key) {
          
          this.current_point = L.marker(cordinates, {
            
         
           
            // fillColor: "#fcba03",
            // color: point_color,
            // radius: 3,

            // style:{
            //    iconSize:     [25, 30],
            // // iconUrl: this.url_icon

            // }
           

            // pointToLayer:function (){
            //     var myIcon = new L.icon({
            //         iconUrl: '../src/assets/images/red-pin.svg', 
            //         iconSize:     [25, 30], // width and height of the image in pixels
            //         shadowSize:   [35, 20], // width, height of optional shadow image
            //         iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
            //         shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
            //         popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
            //       });
            //     if (value.properties.Reasons === 'Curve preceeding a hill, blindspot, lack of signage'){
            //       console.log(value.properties.Reasons, 'REASONS')
            //       return L.marker( { icon: myIcon });
            //     }
            // }
          
         

          });
          //  console.log( value , 'VALUES' )
          var size = 3; //divided by 100 to resize the markers

        L.Icon.Big = L.Icon.Default.extend({
    options: {
      
    iconSize: [40, 40],
}});

 var normal_icon = L.icon({
   
      iconUrl: require("../src/assets/images/marker.svg"),
    iconSize: [25, 31],
    iconAnchor: [12.5 ,15]
});
var biggerIcon = new L.Icon.Big();


function setLoadEvent(layer) {
  
  layer.on("load", function() {
    this.current_point.bounce(20)
  });
}

        
    
          this.current_point.addTo(this.points_layerGroup)
    //       .
          
          
    //       setBouncingOptions({
    //     bounceHeight : 10,    // height of the bouncing
    //     bounceSpeed  : 54,    // bouncing speed coefficient
    //     exclusive    : true,  // if this marker is bouncing all others must stop

    //     // duration: 500,
    //     //  height: 100, 
    //     //  loop: 2
    // }).on('mouseover', function() {
    //    this.bounce(2)
    //     // this.toggleBouncing();
    //     this.setIcon(biggerIcon);
    // })
    // .on('mouseout', function() {
       
    //     this.setIcon(normal_icon);
    // });


    
         
          // this.map.fitBounds(window.markers.getBounds(), {
          //   // padding: [50, 50],
          // });
          

          // this.map.addLayer(markers);

          return `${key}`;
        }
      });

      window.markers.addTo(this.map);
       

     
    },

    load_all_hotspots() {

        axios.get('http://192.168.1.41:8100/HotSpots/'
                    )
           .then((response) => {
                         console.log( response.data,'hotspot data' );

                         const hotspot_data = response.data 
                          // if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                         console.log(response.data.features[0].properties.Reasons, 'PRE reasons')
                        
                               this.current_hotspots = L.geoJSON(hotspot_data, { 

                                 pointToLayer: function (feature, latlng){


                                  var studioicon = L.icon({
                                    iconUrl: require("../src/assets/images/red-pin.svg"),
                                    iconSize: [30, 30],
                                    iconAnchor: [15,15]
                                  });
                                      var smallIcon = L.icon({
                                        iconUrl: require("../src/assets/images/green-pin.svg"),
                                        iconSize: [50, 40],
                                        iconAnchor: [15,15]
                                      });
                                      var marker = L.marker(latlng, {icon: studioicon});
                                      // marker.smallIcon = smallIcon;
                                      return marker;
                                  }






                               }).addTo(this.map);
                                               
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            }) 

    },
      displayToKey($event) {
   var data = $event
   window.county_data = $event
   this.$emit('selected county',  window.county_data)

  // console.log( data, "event")
  
  // if (data === 'Kiambu') {
  //   console.log('Kiambu selected')
  // } else{
  //   console.log('other counties selected')
  // }

    if(data){ 

      if (this.points_layerGroup !== null) {
        window.markers.clearLayers();
      }
       if (this.current_geojson) this.map.removeLayer(this.current_geojson);
                    axios.get(baseurl+'/AdminData/get_adm1_shapefile?Get_county='+data 
                    )
           .then((response) => {
                        //  console.log( response.data,'blackspot data' );

                         const county_data = response.data 
                         
                         
                        
                               this.current_geojson = L.geoJSON(county_data, {

                                      style: {
                                        color: "black",
                                        opacity: 0.5,
                                      },
                                    }).addTo(this.map);

                                    this.map.fitBounds(this.current_geojson.getBounds(), {
                                      padding: [50, 50],
                                    });


                                    //all points per county

                               axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?hotspot_per_county='+data
                    )
           .then((response) => {
                         console.log( response.data,'hotspot data per county' );

                         const all_hotspot_data = response.data 
                          if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                        //  console.log(response.data.features[0].properties.Reasons, 'PRE reasons')
                        
                               this.current_hotspots = L.geoJSON(all_hotspot_data, {




                                 pointToLayer: function (feature, latlng){


                                  var studioicon = L.icon({
                                    iconUrl: require("../src/assets/images/marker.svg"),
                                    iconSize: [30, 30],
                                    iconAnchor: [15,15]
                                  });
                                      var smallIcon = L.icon({
                                        iconUrl: require("../src/assets/images/green-pin.svg"),
                                        iconSize: [50, 40],
                                        iconAnchor: [15,15]
                                      });
                                      var marker = L.marker(latlng, {icon: studioicon});
                                      // marker.smallIcon = smallIcon;



                                            L.Icon.Big = L.Icon.Default.extend({
                                                  options: {
                                                    iconUrl: require("../src/assets/images/marker.svg"),
                                                  iconSize: [40, 40],
                                              }});

                                              var normal_icon = L.icon({
                                                
                                                    iconUrl: require("../src/assets/images/marker.svg"),
                                                  iconSize: [25, 31],
                                                  iconAnchor: [12.5 ,15]
                                              });
                                              var biggerIcon = new L.Icon.Big();

                                              marker.setBouncingOptions({
                                                      bounceHeight : 10,    // height of the bouncing
                                                      bounceSpeed  : 54,    // bouncing speed coefficient
                                                      exclusive    : true,  // if this marker is bouncing all others must stop
                                                      // duration: 500,
                                                      //  height: 100, 
                                                      //  loop: 2
                                                  }).on('mouseover', function() {
                                                    marker.bounce(2)
                                                      // this.toggleBouncing();
                                                      marker.setIcon(biggerIcon);
                                                  })
                                                  .on('mouseout', function() {
                                                    
                                                      marker.setIcon(normal_icon);
                                                  })



                                      return marker;
                                  }

                                 
                                })
                             .addTo(this.map);

                                
                                               
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            }) 

                        //roads data

          //                axios.get('http://192.168.1.29:8100/Roads/?county='+data 
          //           )
          //  .then((response) => {
          //               //  console.log( response.data,'roads data' );

          //                const road_data = response.data 
          //                 if (this.current_road) this.map.removeLayer(this.current_road);
                         
                        
          //                      this.current_road = L.geoJSON(road_data, {
          //                             style: {
          //                               color: "red",
          //                               weight: 0.5,
          //                             },
          //                           }).addTo(this.map);
                                               
          //               return response.data
                        
                      

          //           })
          //          .catch( (error) => {
          //       console.log('an error occured ' + error);
          //   })                                                             
                        // return response.data
                       //end of road data 
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })
            //end of county data


              }
},

      zoom_in() {
      this.map.setZoom(this.map.getZoom() + 1);
    },

    zoom_out() {
      this.map.setZoom(this.map.getZoom() - 1);
    },
    handle_selected_component(selection) {
      this[selection] = true;
      // console.log(  "button clicked!")
    
    }, 
     close_container(container) {
    this[container] = false;
  },

  close_map_container(container){
     this[container] = false;
  },
    setupLeafletMap() {
      const { osm, mapbox, mapboxSatellite } = baseLayers;


      this.baseMaps = {
        DarkMap: osm,
        MapBox: mapbox,
        MapBoxSatellite: mapboxSatellite,
      };
      console.log(this.baseMaps, "basemaps list");

      this.map = L.map("map", {
        zoomControl: false,
        layersControl: false,
        center: this.center,
        minZoom: 4.4,
        maxZoom: 17,
        zoom: 6.5,
        // measureControl: true,
        // defaultExtentControl: true,
        layers: [mapbox]
      }); // add the basemaps to the controls

      L.control.layers(this.baseMaps).addTo(this.map);


      ///////////////////hide layers control
      var layerControl = document.getElementsByClassName(
        "leaflet-control-layers"
      );
      layerControl[0].style.visibility = "hidden";

      //  L.control.sideBySide(this.baseMaps.OpenStreetMap, this.baseMaps.MapBox).addTo(this.map);
      this.map.createPane("rasters");
      this.map.getPane("rasters").style.zIndex = 300;



      //print control
      L.control.browserPrint({position: 'bottomright', className: 'leaflet-browser-print', title: 'Print ...'}).addTo(this.map);
      $(".leaflet-browser-print").html(this.chart).addTo(this.map)



    },

    setupGoogleMap() {
       var center = window.point_latlon
       const fenway = { 
        lat: 0.02, 
        lng:  37.8582273 };
      //  console.log(center, 'google maps center')

  const loader = new Loader({
  apiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: center,
  zoom: 14
};

loader
  .load()
  .then((google) => {
    new google.maps.Map(document.getElementById("map2"), mapOptions);
  })
  .catch(e => {
    console.log(e, 'error')
  });



function initialize() {
  // const fenway = { lat: 0.02, lng:  37.8582273 };

   var center = window.point_latlon
  const map = new google.maps.Map(document.getElementById("map2"), {
    center: center,
    zoom: 14,
  });
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: center,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );

  map.setStreetView(panorama);
 
console.log(center, 'center as points')

 //test to add points to goggle maps

var marker = new google.maps.Marker( {
  position: {
    lat:  36.62815050024545,
    lng: -0.967566999617304, 
   },
   map: map,
   icon: '../src/assets/images/marker.svg'


});
}

window.initialize = initialize;
    },

       handle_baseLayers() {
      setTimeout(() => {
        if (this.base_map_ctrl_cliked === false)
          this.base_map_ctrl_selections = false;
      }, 500);
    },
    change_base_map(base_map) {
      const index = Object.keys(this.baseMaps).indexOf(base_map);

      let layerControlElement = document.getElementsByClassName(
        "leaflet-control-layers"
      )[0];
      layerControlElement.getElementsByTagName("input")[index].click();
    },

    display_route_name($event){
      window.route_name = $event
      console.log( window.route_name, 'route name')

    },
    display_cause_name($event){
      window.cause_name = $event
      console.log( window.cause_name, 'cause name')

    },

    getRoutesList() {
      var county =  window.county_data
      console.log(county, 'selected county for routes')


      //http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?routes_points=Route1 (Kiambu and Embu)

      
      
        axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?road_names='+county
                    )
           .then((response) => {
                        //  console.log( response.data,'routes data' );
                          this.routes = response.data.Routes 
                          window.routes =   response.data.Routes  
                                  
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })

            //load points in routes

            var route = window.route_name
            console.log(route, 'selected route')


             axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?road_points='+route
                    )
           .then((response) => {
                         console.log( response.data,'points in routes');
                         var region_hotspots = response.data

                           
                          //  if (this.point_hotspot !== null) this.map.removeLayer(this.point_hotspot);

                              if (this.current_hotspots)this.map.removeLayer(this.current_hotspots);
// this.current_hotspots = L.geoJSON(all_hotspot_data, { }).addTo(this.map);

                               window.point_latlon = this.current_hotspots.getBounds();

                         this.current_hotspots = L.geoJSON(region_hotspots, {


                                             pointToLayer: function (feature, latlng){


                                  var studioicon = L.icon({
                                    iconUrl: require("../src/assets/images/marker.svg"),
                                    iconSize: [30, 30],
                                    iconAnchor: [15,15]
                                  });
                                      var smallIcon = L.icon({
                                        iconUrl: require("../src/assets/images/green-pin.svg"),
                                        iconSize: [50, 40],
                                        iconAnchor: [15,15]
                                      });
                                      var marker = L.marker(latlng, {icon: studioicon});
                                      // marker.smallIcon = smallIcon;



                                            L.Icon.Big = L.Icon.Default.extend({
                                                  options: {
                                                    iconUrl: require("../src/assets/images/marker.svg"),
                                                  iconSize: [40, 40],
                                              }});

                                              var normal_icon = L.icon({
                                                
                                                    iconUrl: require("../src/assets/images/marker.svg"),
                                                  iconSize: [25, 31],
                                                  iconAnchor: [12.5 ,15]
                                              });
                                              var biggerIcon = new L.Icon.Big();

                                              marker.setBouncingOptions({
                                                      bounceHeight : 10,    // height of the bouncing
                                                      bounceSpeed  : 54,    // bouncing speed coefficient
                                                      exclusive    : true,  // if this marker is bouncing all others must stop
                                                      
                                                  }).on('mouseover', function() {
                                                    marker.bounce(2)
                                                      // this.toggleBouncing();
                                                      marker.setIcon(biggerIcon);
                                                  })
                                                  .on('mouseout', function() {
                                                    
                                                      marker.setIcon(normal_icon);
                                                  })



                                      return marker;
                                  },


                          onEachFeature: this.onEachPoint,
                         
                          }).addTo(this.map);

                          // window.googlemap_points = this.point_hotspot.getBounds();
                          // console.log(window.googlemap_points, 'global google map points')

                          window.point_latlon = this.current_hotspots.getBounds().getCenter();
                          console.log( window.point_latlon, 'point latlon')
                          this.map.fitBounds( this.current_hotspots.getBounds(), {
                            padding: [50, 50],
                          });
                                                        
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })


    },

    onEachPoint( feature, layer) {
      layer.on('click', function (selection) {
        this['info'] = selection;
        selection = true;
          // $(".info") = true;

      })
      

    
       layer.on('click', function(e) {
        $(".info")

        // this.img_url = <img src={feature.properties.AdditionalInfo.image} type="video/mp4" / 
    $(".name").html('<b> Blackspot:</b>'+ ' '+feature.properties.BlackspotName);
    $(".county").html('<b> County:</b>'+ ' '+feature.properties.County);
    $(".route").html('<b> Road Name:</b>'+ ' '+feature.properties.RoadName);
    $(".cause").html('<b> Cause:</b>'+ ' '+feature.properties.Reasons);
    $(".mitigation").html('<b> Mitigation:</b>'+ ' '+feature.properties.Mitigation);
    $(".media1").html('<b> Media:</b>')
    $(".picture_title").html('<b> Picture:</b>');
    $(".media").find('img')['prevObject'][0].src = feature.properties.AdditionalInfo['image'];
    $(".media").find('img')['prevObject'][0].style="height: 100px; width: 200px; position: relative; top: -1.9vh; left: 5vw; outline:none; border: none;"

    $(".video_title").html('<b> Video:</b>');
    $(".video_").find('video')['prevObject'][0].src = feature.properties.AdditionalInfo['video'];
    $(".video_").find('video')['prevObject'][0].style="height: 150px; width: 200px; position: relative; top: -7vh; left: 5vw;  controls"
    $(".video_").find('video')['prevObject'][0].type="video/mp4";
  $(".info_title").find('span')['prevObject'][0].style="display: none;"
    
    
  });

      },



    getCausesList() {
      var county =  window.county_data
      axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?list_causes_per_county='+county
                    )
           .then((response) => {
                        //  console.log( response.data,'routes data' );
                          this.causes = response.data.Causes
                          // window.routes =   response.data.Routes  http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?hotspot_per_cause=Cc
                                  
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })



             var cause = window.cause_name
            console.log(cause, 'selected cause')


             axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?hotspot_per_cause='+cause+'&county='+county//http://192.168.1.41:8100/HotSpots/get_hotspot_per_county/?hotspot_per_cause=Driver related&county=Embu
                    )
           .then((response) => {
                         console.log( response.data,'points in causes');
                         var cause_hotspots = response.data
                           if (this.point_hotspot !== null) this.map.removeLayer(this.point_hotspot);
                           if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);

                         this.point_hotspot = L.geoJSON(cause_hotspots , { 

                                                  pointToLayer: function (feature, latlng){


                                  var studioicon = L.icon({
                                    iconUrl: require("../src/assets/images/marker.svg"),
                                    iconSize: [30, 30],
                                    iconAnchor: [15,15]
                                  });
                                      var smallIcon = L.icon({
                                        iconUrl: require("../src/assets/images/green-pin.svg"),
                                        iconSize: [50, 40],
                                        iconAnchor: [15,15]
                                      });
                                      var marker = L.marker(latlng, {icon: studioicon});
                                      // marker.smallIcon = smallIcon;



                                            L.Icon.Big = L.Icon.Default.extend({
                                                  options: {
                                                    iconUrl: require("../src/assets/images/marker.svg"),
                                                  iconSize: [40, 40],
                                              }});

                                              var normal_icon = L.icon({
                                                
                                                    iconUrl: require("../src/assets/images/marker.svg"),
                                                  iconSize: [25, 31],
                                                  iconAnchor: [12.5 ,15]
                                              });
                                              var biggerIcon = new L.Icon.Big();

                                              marker.setBouncingOptions({
                                                      bounceHeight : 10,    // height of the bouncing
                                                      bounceSpeed  : 54,    // bouncing speed coefficient
                                                      exclusive    : true,  // if this marker is bouncing all others must stop
                                                      
                                                  }).on('mouseover', function() {
                                                    marker.bounce(2)
                                                      // this.toggleBouncing();
                                                      marker.setIcon(biggerIcon);
                                                  })
                                                  .on('mouseout', function() {
                                                    
                                                      marker.setIcon(normal_icon);
                                                  })



                                      return marker;
                                  },


                               onEachFeature: this.onEachPoint,




                         }).addTo(this.map);
                         this.map.fitBounds( this.point_hotspot.getBounds(), {
                            padding: [50, 50],
                          });
                                         
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })

    }

  

   }

   

  
}
</script>


<style scoped>
@import "./assets/app.css";

</style>
