<template>
  <div id="app" class="app">
    <span class="app2" v-if="app2"></span>

    <div class="navbar" id="nav">
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
        title="Download Mapographics"
   
        >
        <a class="map_link" href="https://www.w3docs.com/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf" target="_blank">Mapographics</a></div>


      </div>

      <div class="logo2">
        <img src="./assets/images/white-logo.png" alt="">
      </div>

    </div>


<!-- display analysis panel      @click="download_mapographics"-->
<div v-if="start" class="start" @click="handle_selected_component('analyze');close_container('start') ">
  <span class="begin">Start Analysis</span>
   <img class="menu" src="./assets/images/menu.svg"  alt="">
</div>
   

    
       <img class="close_analysis"  @click="close_container('analyze');handle_selected_component('start') " src="./assets/images/close_small.svg" alt="">
       <div class="analyze" v-if="analyze">
             <Analysis id="analysis_panel" 
       @selected_component="handle_selected_component"
       @close_component="close_container"
      @county_data="displayToKey"
      @points_per_county="points_per_county"
      @points_per_route="points_per_route"
      @points_per_cause="points_per_cause"
      @selected_county="handle_selected_county"
      @selected_cause="handle_selected_cause"
      @selected_chart="switch_charts"/>
       </div>
   
      

    


    <div class="chart_container" id="chart_container" v-if="chart_container">
        <img class="close_chart_container"
        src="./assets/images/close_small.svg"
        @click="close_container('chart_container')"
         alt="" >
         <div class="title">
          Summary Statistics
         </div>


          <CauseStats :height="230" :width="300" :county="this.county" :cause="this.cause" style="position: relative; top:2vw"
           v-if="cause_stats"
            id="cause_stats"
            
            />
          
           <!-- <button @click="close_container('cause_stats')">click</button> -->

         <!-- <div class="cause_stats" id="cause_stats" >
         
        </div> -->

         <div class="county_chart" id="county_chart" v-if="county_chart" >
          <HotspotsDoughnut :height="230" :width="300"  id="county_chart1"/>
         </div> 

    </div>

    <Hotspots
     @school_data="load_all_hotspots" 
     />


     <!-- display popup info panel -->

     <div class="info" v-if="info">
       <img class="close_info"  @click="close_container('info')" src="./assets/images/close_small.svg" alt="">
       <img   class="tape_5" src="./assets/images/tape_5.png" alt="">
       <img   class="tape_10" src="./assets/images/tape_5.png" alt="">
       <img class="pin" src="./assets/images/pin.svg" alt="">
       
 <span class="info_title" style="position: absolute; left: 2vw;">Click a point  on the map <br> to display  data </span>
    
       <br>
       <br>
      <div class="name"  style="display: inline-block; color:#fff; font-size: 14px; position: relative; "></div>
      <br>
      <br>
      <div class="county" style="display: inline-block; color:#fff; font-size: 14px;  position: relative; "></div>
      <br>
      <br>
      <div class="cause" style="display: inline-block;  color:#fff; font-size: 14px; height: 5px; position: relative; "></div>
      <br>
      <br>
      <div class="mitigation" style="display: inline-block; color:#fff; font-size: 14px;  height: 5px;  position: relative; " ></div>
      <br>
      <br>
      <!-- <div class="separator"></div> -->
      <!-- <br> -->
      
       <br>
       <div class="media1" style="color:#fff"></div>
       <p class="picture_title" style="color:#fff"></p>
      
       <img src="" class="media" controls> 
       
       <p class="video_title" style="color:#fff"></p>
       <video src="" class="video_" autoplay=false style="display: none" controls>
      
       </video>
       


  </div>

    <div class="map" id="map" style="position:relative; top:11vh; height: 87vh; width: 100%; ">

      <div class="map_controls">
        <div class="zoomin_tool" id="zoomin">
          <img
            src="./assets/images/zoomin.svg"
            alt=""
            title="Zoom in"
            @click="zoom_in"
          />
        </div>

        <div class="zoomout_tool" id="zoomout">
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
       

       <div class="info_icon" id="info_icon">
          <img
            src="./assets/images/info.svg"
            alt=""
            title="More info"
            @click=" handle_selected_component('info'); speech_text()"
            
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

      <!-- legend -->
      <div id="info_legend" v-if="info_legend">
        <img class="close_legend"
        src="./assets/images/close_xs.svg"
        @click="close_container('info_legend')"
         alt="" style="cursor:pointer" >
        <Legend  />
      </div>
      


      

    </div>
    <!-- map container close -->

    <!-- <div class="mapographics_container" style="background_color: white, borde"     v-if="county_chart"     v-if="cause_stats">
      Download Mapographics
    </div> -->

    <div class="map_id">

    </div>

   


    <!-- 3d view -->
    <div class="googlemap_container" v-if="googlemap_container">
 
          <div id="map2"  >
                      
                </div>
                <button class="map_button" type="button" style="" @click="close_map_container('googlemap_container')"><b>Close Map</b> </button>
                  
                <div id="pano"></div>
    </div>
      

    <!-- vue tour -->

            <v-tour name="myTour" :steps="steps"  :callbacks="myCallbacks"></v-tour>

      <!-- descriptive text -->
      <div class="description" v-if="description">
        <img class="close_description"
        src="./assets/images/close_small.svg"
        @click="close_container('description')"
         alt="" >
         <div class="text">
         <strong style="position: absolute; width: 100%; top: -1vh; text-align: center; left: -0.7vw">CrashDash</strong>  <br>

         <!-- <img src="./assets/images/tape_straight.png" style="width:100px; height: 4px; position: absolute; top: 0.8vh; left: 1vw;  transform: rotate(-1deg) " alt="">
         <img src="./assets/images/tape_straight.png" style="width:100px; height: 4px; position: absolute; top: 0.8vh; left: 13vw;  transform: rotate(0deg) " alt=""> -->
         
         <img class="pin" src="./assets/images/pin.svg"   style="position: absolute; width: 20px; height: 25px; top: -1.5vh; text-align: center; left: 11.5vw" alt="">
            CrashDash is a geoportal designed and built to disseminate information on major blackspots in Kenya. 
            The purpose of the geoportal is to:
            <ul>
              <li>Identify major contributing factors to road crashes</li>
              <li>Diagnose the cause of crashes</li>
              <li>Identify accident blackspots and visualize them</li>
              <li>Analyze and suggest recommendations </li>
            </ul>
            <div class="fun">Have fun as you explore our geoportal! </div>
            <div class="sticker">
              <iframe src="https://giphy.com/embed/UQDSBzfyiBKvgFcSTw" width="50" height="50" frameBorder="0" class="giphy-embed"
               allowFullScreen></iframe>
            </div>
      
            
             
             
            

         </div>
      
      </div>

      
   
   
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
import domToPdf from "dom-to-pdf"
import { saveAs } from "file-saver";
import "leaflet.browser.print/dist/leaflet.browser.print.min.js"
import CauseStats from './components/charts/CauseStats.vue'
import speechSynthesis from 'speech-synthesis'
import Analysis from './components/Analysis.vue'
import Legend from './components/Legend.vue'
// import VueTour from 'vue-tour'


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



var baseurl = 'http://45.63.48.25:8080'  //http://45.63.48.25:8080

// console.log(this.img_url, 'url outside')

export default {
   name: "App",
   components:{
    CustomSelect,
    Hotspots,
    HotspotsDoughnut,
    CauseStats,
     Analysis,
     Legend,
    //  vtour:require('vue-tour/dist/vue-tour.css')
     

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
      chart_container: true,
      info: false,
      // analysis: true,
      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      selected_county: '',
      routes: [],
      causes:[],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],
      // charts: false,
      img_url: '',
      alert_panel: false,
      start: false, 
      analyze: true,
      cause_stats: false,
      county_chart: true,
      county: '',
      cause: '',
       steps: [],
       myCallbacks: {
       onStop: this.myCustomPreviousStepCallback,
  
      },
       description: true,
       info_legend: true,
       app2: true

    }

   },

   

   mounted() {

    this.setupLeafletMap();
    this.load_country();
    
    this.switch_charts();
     
    this.steps.push({
      target: ".map_id", // We're using document.querySelector() under the hood
      header: {
        title: "Map Section",
      },
      content: `Visualize all the data from the analysis panel`,
    });
    this.steps.push({
      target: "#analysis_panel", // We're using document.querySelector() under the hood
      header: {
        title: "Analysis Panel",
      },
      content: `Perform filters based on a county, road, cause and mitigation and view statistics`,
    });
   this.steps.push({
      target: "#zoomin", // We're using document.querySelector() under the hood
      header: {
        title: "Zoom In Control",
      },
      content: `Zoom into the map using this control`,
    });
    this.steps.push({
      target: "#zoomout",
      content: "Zoom out of the map using this control",
    });
    this.steps.push({
      target: ".basemaps",
      content: "Hover on the button and click on the selections to switch from one basemap to the other",
    });
    this.steps.push({
      target: ".download",
      content: "Click on this button to download a screenshot of the map",
    });
    this.steps.push({
      target: ".info_icon",
      content: "Click on this button to display information about the blackspots",
    });
    this.steps.push({
      target: ".dimension",
      content: "Have a 3D view of the map",
    });
     this.steps.push({
      target: ".chart_container",
      content: "View statistics on the loaded blackspot data",
    });
     this.steps.push({
      target: "#info_legend",
      content: "Here is a legend to provide information about data loaded on the map",
    });
    
    this.steps.push({
      target: '.leaflet-control-browser-print.leaflet-bar.leaflet-control',
      content:
        "Click here to download the map in pdf format",
      params: {
        placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
      },
    });
    
    this.$tours["myTour"].start();

   

   },
  

   methods: {

     myCustomPreviousStepCallback () {
      //  this[container] = false;
      this.app2 = false;
    
  },
    switch_charts() {

         $(".cause_stats").on("load", function() {
        console.log('CAUSE STATS  HAS LOADED')
      //  this.county_chart = false;
    })
      

    },

    speech_text() {

      var Karen = speechSynthesis.names['Karen']
      speechSynthesis('Click the point on the map to display the data ', 'Google UK English Female');
      

    },
    //data for props
    handle_selected_county(val) {
        this.county = val
        console.log(this.county, 'THIS . COUNTY') //WORKS, LOGS SELECTED COUNTY

      },

      handle_selected_cause(val) {
        this.cause = val
        console.log(this.cause, 'THIS . CAUSE') 

      },

    download_mapographics() {
      const doc = new jsPDF();
       $('.mapographics').click(function () {
        doc.save('sample-file.pdf');
    });


    },

      screenshot() {
      domtoimage.toBlob(document.getElementById("map" )).then(function (blob) {
        
        saveAs(blob, "map.png");

      });

    },

     chart_to_png(){
      window.image = domtoimage.toBlob(document.getElementById("county_chart1" ))
      // console.log(window.image, 'chart inside')
        domtoimage.toBlob(document.getElementById("county_chart1" )).then(function (blob) {
        
        saveAs(blob, "chart.png");
        
      });

      var image_URI =document.getElementById("county_chart1" )
      // console.log(image_URI.$route, 'route')
       
      window.url = document.getElementById("doughnut-chart").toDataURL()
      // console.log(window.url, 'image uri')
        

      },

      
      load_country() {

                  axios.get(baseurl+'/AdminData/get_admin_zero/?country=Kenya'  //http://45.63.48.25:8080/AdminData/get_admin_zero?country=Kenya
                    )
           .then((response) => {
                        //  console.log( response.data,'hotspot data per county' );

                         const country_data = response.data 
                         console.log(country_data, 'boundary')

                       this.current_geojson = L.geoJSON(country_data, {
                        style: {
                          color: "black",
                          opacity: 0.5,
                        }
                       }).addTo(this.map)
                   
                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })

      },


//     handle_point_data(val) {
//       // console.log("I HAVE ARRIVED")
//       // if (this.points_layerGroup !== null) {
//       //   window.markers.clearLayers();
//       // }

//       window.markers = new L.featureGroup();
//       this.points_layerGroup = window.markers;
//       // var radius = this.pointStyle;

//       var points = val; //.features[0]['geometry'] dewewewe
//       // console.log(points, 'POINTS' ) //WORKING

//       this.map.createPane("rasters");
//       this.map.getPane("rasters").style.zIndex = 500;

//       Object.entries(points.features).forEach(([key, value]) => {

//         // console.log(points.features, 'POINTS FEATURES' ) //WORKING

//         var cordi = value.geometry.coordinates[0] 

//         var cordinates = [cordi[1],cordi[0]]
//         // console.log( key , 'KEYS', cordinates )
//         // thisiconUrl
//         // console.log(value.properties.Reasons, 'REASONS') Overspeeding
//         var point_color = '#099f46'
//         if (value.properties.Reasons === 'Curve preceeding a hill, blindspot, lack of signage'){
         
//           point_color = "#fcba03"
          
         
//                 }

//           if (value.properties.Reasons === 'Lack of signage'){
         
//           point_color = "#03fc52"
          
         
//                 }
//           if (value.properties.Reasons === 'Overspeeding'){
         
//           point_color = "#3003fc"
          
         
//                 }

//         if (key) {
          
//           this.current_point = L.marker(cordinates, {
            
         

//           });
//           //  console.log( value , 'VALUES' )
//           var size = 3; //divided by 100 to resize the markers

//         L.Icon.Big = L.Icon.Default.extend({
//     options: {
      
//     iconSize: [40, 40],
// }});

//  var normal_icon = L.icon({
   
//       iconUrl: require("../src/assets/images/marker.svg"),
//     iconSize: [25, 31],
//     iconAnchor: [12.5 ,15]
// });
// var biggerIcon = new L.Icon.Big();


// function setLoadEvent(layer) {
  
//   layer.on("load", function() {
//     this.current_point.bounce(20)
//   });
// }

        
    
//           this.current_point.addTo(this.points_layerGroup)
    

//           return `${key}`;
//         }
//       });

//       window.markers.addTo(this.map);


       

     
//     },

//     load_legend() {


// console.log('loaded legend')
//       function getColor(d) {
//         return d === 'Road Surface'  ? "#de2d26" :
//                d === 'Signage'  ? "#377eb8" :
//                d === 'Line Markings' ? "#4daf4a" :
//                d === 'Roadside Hazards' ? "#984ea3" :
//                             "#ff7f00";
//     }

  

//       var legend = L.control();
//     legend.onAdd = function (map) {
//       map = this.map

//     var div = L.DomUtil.create('div', 'info_legend');
//    var  labels = ['<strong>Categories</strong>'],
//     categories = ['Road Surface','Signage','Line Markings','Roadside Hazards','Other'];

//     for (var i = 0; i < categories.length; i++) {

//             div.innerHTML += 
//             labels.push(
//                 '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
//             (categories[i] ? categories[i] : '+'));

//         }
//         div.innerHTML = labels.join('<br>');
//     return div;
//     };
//     legend.addTo(map);

//     },

    load_all_hotspots(val) {

                        //  console.log( response.data,'hotspot data' );

                        //  const hotspot_data = response.data 
                          // if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                        //  console.log(response.data.features[0].properties.Reasons, 'PRE reasons')
                        
                               this.current_hotspots = L.geoJSON(val, { 

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
                                      
                                                  //different visualization per severity

                                           switch (feature.properties.risk){
                                                        case 0 :

                                                          var zero = new L.icon({
                                                            iconUrl: require("/src/assets/images/marker.svg"), 
                                                            iconSize:     [25, 30], // width and height of the image in pixels
                                                            shadowSize:   [35, 20], // width, height of optional shadow image
                                                            iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                            shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                            popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                                                          });
                                                            return L.marker(latlng, { icon: zero });

                                                      
                                                      
                                                        case 1:
                                                            var one = new L.icon({
                                                                iconUrl: require("/src/assets/images/green-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: one});


                                                            case 2:
                                                            var two = new L.icon({
                                                                iconUrl: require("/src/assets/images/fin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: two});

                                                            case 3:
                                                            var three = new L.icon({
                                                                iconUrl: require("/src/assets/images/red-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: three});

                                                   }
                                      return marker;


                                  },
                                   onEachFeature: this.onEachPoint,






                               }).addTo(this.map);
                                               
 
                        
                      

                
    },
      displayToKey($event) {
   var data = $event
   window.county_data = $event
   console.log(data, 'selected  county data')
      if (this.points_layerGroup !== null) {
        window.markers.clearLayers();
      }
       if (this.current_geojson) this.map.removeLayer(this.current_geojson);


         this.current_geojson = L.geoJSON(county_data, {

                                      style: {
                                        color: "black",
                                        opacity: 0.5,
                                      },
                                    }).addTo(this.map);

                                    this.map.fitBounds(this.current_geojson.getBounds(), {
                                      padding: [50, 50],
                                    });
     
            //end of county data            
},

points_per_county(val) {

  if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);

  this.current_hotspots = L.geoJSON(val, {

                                 pointToLayer: function (feature, latlng){

                                  var studioicon = L.icon({
                                    iconUrl: require("/src/assets/images/marker.svg"),
                                    iconSize: [30, 30],
                                    iconAnchor: [15,15]
                                  });
                                      var smallIcon = L.icon({
                                        iconUrl: require("/src/assets/images/green-pin.svg"),
                                        iconSize: [50, 40],
                                        iconAnchor: [15,15]
                                      });
                                      var marker = L.marker(latlng, {icon: studioicon});
                                      // marker.smallIcon = smallIcon;



                                            L.Icon.Big = L.Icon.Default.extend({
                                                  options: {
                                                    iconUrl: require("/src/assets/images/marker.svg"),
                                                  iconSize: [40, 40],
                                              }});

                                              var normal_icon = L.icon({
                                                
                                                    iconUrl: require("/src/assets/images/marker.svg"),
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




                                                  //different visualization per severity



                                           switch (feature.properties.risk){
                                                        case 0 :

                                                          var zero = new L.icon({
                                                            iconUrl: require("/src/assets/images/marker.svg"), 
                                                            iconSize:     [25, 30], // width and height of the image in pixels
                                                            shadowSize:   [35, 20], // width, height of optional shadow image
                                                            iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                            shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                            popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                                                          });
                                                            return L.marker(latlng, { icon: zero });

                                                      
                                                      
                                                        case 1:
                                                            var one = new L.icon({
                                                                iconUrl: require("/src/assets/images/green-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: one});


                                                            case 2:
                                                            var two = new L.icon({
                                                                iconUrl: require("/src/assets/images/fin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [1, 1], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: two});

                                                            case 3:
                                                            var three = new L.icon({
                                                                iconUrl: require("/src/assets/images/red-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: three});

                                                   }



                                      return marker;
                                  },
                                    onEachFeature: this.onEachPoint,

                                 
                                })
                             .addTo(this.map);

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
      // console.log(this.baseMaps, "basemaps list");

      this.map = L.map("map", {
        zoomControl: false,
        layersControl: false,
        center: this.center,
        minZoom: 4.4,
        maxZoom: 20,
        zoom: 6,
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
  //  this.chart_container = L.ImageOverlay().addTo(this.map);
   

//   var imageUrl = 'data:image/png;base64,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'
//   console.log(imageUrl, 'chart outside url')


// var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
// var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
// var latLngBounds = L.latLngBounds([[-1.3, 36.8], [-1.35, 36.85]]);

// var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
//     opacity: 0.8,
//     errorOverlayUrl: errorOverlayUrl,
//     alt: altText,
//     interactive: true
// }).addTo(this.map);

// L.BrowserPrint.Utils.registerRenderer( L.ImageOverlay, ' L.ImageOverlay');




      //print control
      L.control.browserPrint({position: 'bottomright', className: 'leaflet-browser-print', title: 'Print ...'}).addTo(this.map);
    //  this.chart_container({position: 'bottomright'}).addTo(e.printMap);
      // $(".leaflet-browser-print").innerHTML('ERGRERTRYHTRHRT').addTo(this.map)



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
 
// console.log(center, 'center as points')

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
      // console.log( window.route_name, 'route name')

    },
    display_cause_name($event){
      window.cause_name = $event
      // console.log( window.cause_name, 'cause name')
      this.$emit('selected cause',  window.cause_name )

    },

    points_per_route(val) {


       if (this.point_hotspot !== null) this.map.removeLayer(this.point_hotspot);

                              if (this.current_hotspots)this.map.removeLayer(this.current_hotspots);

       this.current_hotspots = L.geoJSON(val, {


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





                                                  //different visualization per severity
  // console.log(feature.properties.risk, 'risky text')



                                            switch (feature.properties.risk){
                                                        case 0 :

                                                          var zero = new L.icon({
                                                            iconUrl: require("/src/assets/images/marker.svg"), 
                                                            iconSize:     [25, 30], // width and height of the image in pixels
                                                            shadowSize:   [35, 20], // width, height of optional shadow image
                                                            iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                            shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                            popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                                                          });
                                                            return L.marker(latlng, { icon: zero });

                                                      
                                                      
                                                        case 1:
                                                            var one = new L.icon({
                                                                iconUrl: require("/src/assets/images/green-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: one});


                                                            case 2:
                                                            var two = new L.icon({
                                                                iconUrl: require("/src/assets/images/fin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: two});

                                                            case 3:
                                                            var three = new L.icon({
                                                                iconUrl: require("/src/assets/images/red-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: three});

                                                   }




                                      return marker;
                                  },


                          onEachFeature: this.onEachPoint,
                         
                          }).addTo(this.map);

                            this.map.fitBounds( this.current_hotspots.getBounds(), {
                            padding: [50, 50],
                          });

    },

    points_per_cause(val) {

         if (this.point_hotspot !== null) this.map.removeLayer(this.point_hotspot);
                           if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);

                         this.point_hotspot = L.geoJSON(val , { 

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
         

  //different visualization per severity
  // console.log(feature.properties.risk, 'risky text')

                                           switch (feature.properties.risk){
                                                        case 0 :

                                                          var zero = new L.icon({
                                                            iconUrl: require("/src/assets/images/marker.svg"), 
                                                            iconSize:     [25, 30], // width and height of the image in pixels
                                                            shadowSize:   [35, 20], // width, height of optional shadow image
                                                            iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                            shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                            popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor
                                                          });
                                                            return L.marker(latlng, { icon: zero });

                                                      
                                                      
                                                        case 1:
                                                            var one = new L.icon({
                                                                iconUrl: require("/src/assets/images/green-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: one});


                                                            case 2:
                                                            var two = new L.icon({
                                                                iconUrl: require("/src/assets/images/fin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: two});

                                                            case 3:
                                                            var three = new L.icon({
                                                                iconUrl: require("/src/assets/images/red-pin.svg"), 
                                                                iconSize:     [25, 31], // width and height of the image in pixels
                                                                shadowSize:   [35, 20], // width, height of optional shadow image
                                                                iconAnchor:   [12.5, 30], // point of the icon which will correspond to marker's location
                                                                shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
                                                                popupAnchor:  [0, -25] // point from which the popup should open relative to the iconAnchor

                                                          });
                                                        
                                                            return L.marker(latlng, {icon: three});

                                                   }



                                      return marker;
                                  },


                               onEachFeature: this.onEachPoint,




                         }).addTo(this.map);
                         this.map.fitBounds( this.point_hotspot.getBounds(), {
                            padding: [50, 50],
                          });

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
    $(".media1").html('<b> Media:</b>');
    $(".picture_title").html('<b> Picture:</b>');
    $(".media").find('img')['prevObject'][0].src = feature.properties.AdditionalInfo['image'];
    $(".media").find('img')['prevObject'][0].style="height: 100px; width: 200px; position: relative; top: -1.9vh; left: 5vw; outline:none; border: none;"

    $(".video_title").html('<b> Video:</b>');
    $(".video_").find('video')['prevObject'][0].src = feature.properties.AdditionalInfo['video'];
    $(".video_").find('video')['prevObject'][0].style="height: 150px; width: 200px; position: relative; top: -7vh; left: 5vw;  controls"
    $(".video_").find('video')['prevObject'][0].type="video/mp4";
  $(".info_title").find('span')['prevObject'][0].style="display: none;"
    $(".pin").find('span')['prevObject'][0].style="display: none;"
    $(".tape_10").find('span')['prevObject'][0].style="display: none;"
    $(".tape_5").find('span')['prevObject'][0].style="display: none;"
    // $(".name").find('span')['prevObject'][0].style="display: none;"
    
    
  });



      },

  

   }

   

  
}
</script>


<style scoped>
@import "./assets/app.css";
.mystyle {
 display: none;
}

</style>
