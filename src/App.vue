<template>
  <div id="app" class="app">
    <span class="app2" v-if="app2"></span>

    <div class="navbar" id="nav">
      <div class="dash_logo">
        <img src="./assets/images/white_crash.svg" alt="">
      </div>

      <!-- <img   class="nav_tape_5" src="./assets/images/tape_5.png" alt=""> -->
      <!-- <img   class="nav_tape_6" src="./assets/images/tape_5.png" alt=""> -->
   
      

      <div class="tagline" id="tagline">
        Providing Information on Major Blackspots in Kenya
      </div>

      <div class="links" id="links">
        <a class="home"  href="https://www.stjohnkenya.org/" target="_blank" >Home</a>
        <div class="dashboard">Dashboard</div>
        <div class="mapographics"
        title="Download Mapographics"
   
        >
        <a class="map_link" href="https://www.w3docs.com/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf" target="_blank">Mapographics</a></div>


      </div>

      <div class="logo2">
        <img class="logoss" src="./assets/images/MBZ LOGO.png" alt="">
        <img class="logoss" src="./assets/images/ntsa2.png" alt="">
        <img class="logoss_kp" src="./assets/images/kp3.png" alt="">
        <img class="logoss" id="john" src="./assets/images/black_logo.png" alt="">
        <img class="logos_juh" id="juh"  src="./assets/images/JUH_Logo.png" alt="">
        
      
       
      
      </div>

    </div>


<!-- display analysis panel      @click="download_mapographics"-->
<div v-if="start" class="start" @click="handle_selected_component('analyze');close_container('start') ">
  <span class="begin">Start Analysis</span>
   <img class="menu" src="./assets/images/menu.svg"  alt="">
</div>
   

    
       <img class="close_analysis" id="analysis_cross"  @click="close_container('analyze');handle_selected_component('start') " src="./assets/images/close_small.svg" alt="">
       <div class="analyze" v-if="analyze">
             <Analysis 
              :default="this.county"
             :name_county="this.county"
             id="analysis_panel" 
       @selected_component="handle_selected_component"
       @close_component="close_container"
      @county_data="displayToKey"
      @points_per_county="points_per_county"
      @points_per_route="points_per_route"
      @points_per_cause="points_per_cause"
      @selected_county="handle_selected_county"
      @selected_county_1="handle_selected_county_1"
      @updated_default="handle_selected_county_1"
      @selected_cause="handle_selected_cause"
      @selected_chart="switch_charts"
     
      
      
      />

      
       </div>
   
      

    


    <div class="chart_container" id="chart_container" v-if="chart_container">
        <img class="close_chart_container"
        src="./assets/images/close_small.svg"
        @click="close_container('chart_container')"
         alt="" >

          <img class="swap_chart"
        src="./assets/images/swap.svg"
         @click="swap_containers"
         alt="" 
         title="swap chart">

         <img class="download_chart"
        src="./assets/images/download.svg"
        @click="chart_to_png"
         alt="" 
         title="download chart">
         <div class="title">
          Summary Statistics
         </div>


          <CauseStats :height="230" :width="300" :county="this.county" :cause="this.cause" style="position: relative; top:2vw"
           v-if="cause_stats"
            id="cause_stats"
            
            />

             <CauseBar :height="180" :width="300" :county="this.county" :cause="this.cause" style="position: relative; top:3vw"
           v-if="cause_bar"
            id="cause_bar"
            
            />

          <HotspotBar :height="230" :width="300"  style="position: relative; top:3vw"
           v-if="bar_stats"
            id="bar_stats"
            
            />
         

         <div class="county_chart" id="county_chart" v-if="county_chart" >
          <HotspotsDoughnut :height="230" :width="300"  id="county_chart1"/>
         </div> 

    </div>

    <Hotspots
     @school_data="load_all_hotspots" 
     />


     <!-- display popup info panel -->

     <div class="info" v-if="info" id="info">
       <img id="close_info" class="close_info"  @click="close_container('info')" src="./assets/images/close_small.svg" alt="">
       <img id="tape_5"  class="tape_5" src="./assets/images/tape_5.png" alt="">
       <img id="tape_10"   class="tape_10" src="./assets/images/tape_5.png" alt="">
       <img class="pin" src="./assets/images/pin.svg" alt="" id="pin">
       
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
       <img id="slideshow" src="" controls />
       
       <p class="video_title" style="color:#fff"></p>
       <video id="video" src="" class="video_" autoplay=false style="display: none" controls>
      
       </video>

       <!-- full page panel -->
       <!-- <div id="fullpage" onclick="this.style.display='none';"></div> -->
       


  </div>

   <!-- opacity -->
      <div class="opacity" v-if="opacity">
        <span id="opacity">Opacity:</span>
         <span id="image-opacity"> </span>
        <input type="range" id="sldOpacity" min="0" max="1" step="0.1" value="0.5" />

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
            src="./assets/images/opacity.svg"
            alt=""
            title="Change opacity"
           @click=" handle_selected_component('opacity')"
            
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
        <img class="close_legend" id="legend_cross"
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
      
      <!-- <div  class="county_name_container" @click="print_pdf" style="position: absolute; top: 50vh; left: 50vw; background-color: #fff; height: 30px; width:30px;z-index:1000;"> -->
        <!-- {{this.county}} -->
      <!-- </div> -->

    <!-- vue tour -->

            <!-- <v-tour name="myTour" :steps="steps"  :callbacks="myCallbacks"></v-tour> -->

      <!-- descriptive text -->
      <div class="description" v-if="description" id="desc">
        <img class="close_description"
        src="./assets/images/fancy_close.svg"
        @click="close_container('description')"
         alt="" >
         <div class="text" id="desc_text">
         <strong class="crashdash" style="position: absolute; width: 100%; top: -1vh; text-align: center; left: -0.7vw">CrashDash</strong>  <br>

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
              <iframe src="https://giphy.com/embed/UQDSBzfyiBKvgFcSTw" id="emoji" width="50" height="50" frameBorder="0" class="giphy-embed"
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
import HotspotBar from './components/charts/HotspotBar.vue'
import CauseBar from './components/charts/CauseBar.vue'
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
import "leaflet.control.opacity/dist/L.Control.Opacity.css";
import 'leaflet.control.opacity';
// import "./css/style.css";


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
// var layer = this.current_geojson

// console.log(this.img_url, 'url outside')

export default {
  //test for provide and inject
   inject: ['message'],
  created() {
    console.log(this.message,'injected value' ) // injected value
  },

   name: "App",
   components:{
    CustomSelect,
    Hotspots,
    HotspotsDoughnut,
    CauseStats,
     Analysis,
     Legend,
     HotspotBar,
     CauseBar
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
      bar_stats: false,
      cause_bar:false,
      county_chart: true,
      county: '',
      cause: '',
       steps: [],
      //  myCallbacks: {
      //  onStop: this.myCustomPreviousStepCallback,

      //   new_selected_county: this.selected_county 
  
      // },
       description: true,
       info_legend: true,
       app2: true,
       county_name: '',
       control: null,
       opacity:false
      //  value: "1"

    }

   },

   

   mounted() {

    this.setupLeafletMap();
    this.load_country();
    
    this.switch_charts();
     
  //   this.steps.push({
  //     target: ".map_id", // We're using document.querySelector() under the hood
  //     header: {
  //       title: "Map Section",
  //     },
  //     content: `Visualize all the data from the analysis panel`,
  //   });
  //   this.steps.push({
  //     target: "#analysis_panel", // We're using document.querySelector() under the hood
  //     header: {
  //       title: "Analysis Panel",
  //     },
  //     content: `Perform filters based on a county, road, cause and mitigation and view statistics`,
  //   });
  //  this.steps.push({
  //     target: "#zoomin", // We're using document.querySelector() under the hood
  //     content: `Zoom into the map using this control`,
  //   });
  //   this.steps.push({
  //     target: "#zoomout",
  //     content: "Zoom out of the map using this control",
  //   });
  //   this.steps.push({
  //     target: ".basemaps",
  //     content: "Hover on the button and click on the selections to switch from one basemap to the other",
  //   });
  //   this.steps.push({
  //     target: ".download",
  //     content: "Click on this button to download a screenshot of the map",
  //   });
  //   this.steps.push({
  //     target: ".info_icon",
  //     content: "Click on this button to display information about the blackspots",
  //   });
  //   this.steps.push({
  //     target: ".dimension",
  //     content: "Have a 3D view of the map",
  //   });
  //    this.steps.push({
  //     target: ".chart_container",
  //     content: "View statistics on the loaded blackspot data",
  //   });
  //    this.steps.push({
  //     target: "#info_legend",
  //     content: "Here is a legend to provide information about data loaded on the map",
  //   });
    
  //   this.steps.push({
  //     target: '.leaflet-control-browser-print.leaflet-bar.leaflet-control',
  //     content:
  //       "Click here to download the map in pdf format",
  //     params: {
  //       placement: "top", // Any valid Popper.js placement. See https://popper.js.org/popper-documentation.html#Popper.placements
  //     },
  //   });
    
  //   this.$tours["myTour"].start();

   

   },
  

   methods: {
    print_pdf() {
      window.print( );
      // console.log(document, 'window')
      // document.documentTitle = "Some new title text";

    },

  //    myCustomPreviousStepCallback () {
  //     //  this[container] = false;
  //     this.app2 = false;
    
  // },
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
      this.county = val;
      // var data = val.features[0].properties.county_name
      // console.log(data, 'data data')
       console.log(val, 'THIS . COUNTY') //WORKS, LOGS SELECTED COUNTY
        
      
      // this.control =  L.control.browserPrint({position: 'bottomright', 
      // className: 'leaflet-browser-print',
      // //  title: val,
      //  documentTitle: val //{val} //window.counties//window.county_data //this.county //
      // //  printFunction: this.handle_selected_county
      //  })
        // return this.county


   




      },
       handle_selected_county_1(val) {
      this.county = val;
      // var data = val.features[0].properties.county_name
      // console.log(data, 'data data')
      var name = val
       console.log(name, 'VAL . COUNTY') //WORKS, LOGS SELECTED COUNTY
        
       this.control =  L.control.browserPrint({position: 'bottomright', 
      className: 'leaflet-browser-print',
      //  title: val,
       documentTitle:  val //name // name //val 
      //  printFunction: this.handle_selected_county
       })
      


   




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
      // window.image = domtoimage.toBlob(document.getElementById("county_chart1" ))
      // console.log(window.image, 'chart inside')
       if (this.county_chart) {
        domtoimage.toBlob(document.getElementById("county_chart" )).then(function (blob) {
        
        saveAs(blob, "doughnut chart.png");
        
      });
      }
       if (this.bar_stats) {
        domtoimage.toBlob(document.getElementById("bar_stats" )).then(function (blob) {
        
        saveAs(blob, "bar chart.png");
        
      });
      } 
      
      if(this.cause_stats){
        domtoimage.toBlob(document.getElementById("cause_stats" )).then(function (blob) {
        
        saveAs(blob, "cause doughnut chart.png");
        
      });

      }

       if(this.cause_bar){
        domtoimage.toBlob(document.getElementById("cause_bar" )).then(function (blob) {
        
        saveAs(blob, "cause barchart.png");
        
      });

      }
        

      // var image_URI =document.getElementById("county_chart1" )
      // // console.log(image_URI.$route, 'route')
       
      // window.url = document.getElementById("doughnut-chart").toDataURL()
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
      displayToKey($event, value) {
   var data = $event
   this.county_name = data
   console.log(this.county_name.features[0].properties.county_name, 'this.county name')
   window.county_data = $event
   console.log(data, 'selected  county data')


      if (this.points_layerGroup !== null) {
        window.markers.clearLayers();
      }
       if (this.current_geojson) this.map.removeLayer(this.current_geojson);
    


         this.current_geojson = L.geoJSON(county_data, {
          style: {
            color: "black",
            opacity: 0.5
          }
           }).addTo(this.map);
                                    //  var value = window.localStorage.getItem("this.value", this.value) //this gets the item after reload, not immediately
                                    //  console.log(value, 'opacity value 2')

                                    this.map.fitBounds(this.current_geojson.getBounds(), {
                                      padding: [50, 50],
                                    });
                                     this.current_geojson.eachLayer(function(layer) {
                                     $('#sldOpacity').on('change', function(){
                                      // $('#image-opacity').html(this.value); //i might revesit
                                      console.log(this.value, 'opacity value')
                                      
                                      layer.setStyle({fillColor: "black", color: "black", opacity: this.value, fillOpacity: this.value}) //cant use setstyle directly on geojson
                                      return this.value
                                     
                    
                                  });
                                    
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

  swap_containers(){
    if(this.county_chart) {
      this.county_chart = false
      this.bar_stats = true

    }

      if(this.cause_stats) {
      this.cause_stats = false
       this.bar_stats = false
      this.cause_bar = true

    }

  
    
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
        minZoom: 6.3,
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
      // this.control.addTo(this.map)
     

      //  this.control =  L.control.browserPrint({position: 'bottomright', 
      // className: 'leaflet-browser-print',
      // //  title: val,
      //  documentTitle: this.county//window.name //{val} //window.counties//window.county_data //this.county //
      // //  printFunction: this.handle_selected_county
      //  }).addTo(this.map)
      


      //  L.control.sideBySide(this.baseMaps.OpenStreetMap, this.baseMaps.MapBox).addTo(this.map);
      this.map.createPane("rasters");
      this.map.getPane("rasters").style.zIndex = 300;


console.log()
      //print control
      // this.control.addTo(this.map);
    //  this.chart_container({position: 'bottomright'}).addTo(e.printMap);
      // $(".leaflet-browser-print").innerHTML('ERGRERTRYHTRHRT').addTo(this.map)


      // listen for screen resize events




    },


    screenzoom(){

    window.addEventListener('resize', function(event){
    // get the width of the screen after the resize event
    var width = document.documentElement.clientWidth;
    // tablets are between 768 and 922 pixels wide
    // phones are less than 768 pixels wide
    if (width <= 1200 && width <= 1600 ) {
        // set the zoom level to 10
       this.map.options.minZoom(6);
    }  else {
        // set the zoom level to 8
        this.map.options.minZoom(6.5);
    }
});

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
    $(".picture_title").html('<b> Photo:</b>');
    // $(".media").find('img')['prevObject'][0].src = feature.properties.AdditionalInfo['image_array'];
    // $(".media").find('img')['prevObject'][0].style="height: 100px; display:block; width: 200px; position: relative; top: -1.9vh; left: 5vw; outline:none; border: none;"
     $("#slideshow").find('img')['prevObject'][0].style="height: 100px; display:block; width: 200px; position: relative; top: -1.9vh; left: 5vw; outline:none; border: none; controls"

    $(".video_title").html('<b> Video:</b>');
    $(".video_").find('video')['prevObject'][0].src = feature.properties.AdditionalInfo['video'];
    $(".video_").find('video')['prevObject'][0].style="height: 150px; width: 200px; position: relative; top: -7vh; left: 5vw;  controls"
    $(".video_").find('video')['prevObject'][0].type="video/mp4";
  $(".info_title").find('span')['prevObject'][0].style="display: none;"
    $(".pin").find('span')['prevObject'][0].style="display: none;"
    $(".tape_10").find('span')['prevObject'][0].style="display: none;"
    $(".tape_5").find('span')['prevObject'][0].style="display: none;"
    // $(".name").find('span')['prevObject'][0].style="display: none;"
    $("#slideshow").click( function() {
            this.requestFullscreen();
        });
        //  $("#slideshow").mouseover( function() {
        //     this.requestFullscreen();
        // });

    var images_array = feature.properties.AdditionalInfo['image_array']
    console.log(images_array, 'images array')
    var images_values = Object.values(images_array)
    console.log(images_values, 'images values')

      // var keys = Object.keys(images_array)
      // console.log(keys, 'keys')

      // var values = images_array.values()
      // console.log(values, 'it better work')

      // var shareholders = ['name1', 'name2', 'name3'];
      // console.log(shareholders, 'sjareholders')

      // const fullPage = document.querySelector('#fullpage');
      var users=new Array();
      images_array.forEach(function(item,i){
        users[i]=item;

  //       item.addEventListener('click', function() {
  //   // fullPage.style.backgroundImage = 'url(' + img.src + ')';
  //   fullPage.style.display = 'block';
  // });
      });
      console.log(users, 'uuuuuuuuuseeeeeeeeeeerrrrrrrrrrssssssss');

      var galleryarray = users;// image container


rotateimages();
var curimg=0
function rotateimages(){
    document.getElementById("slideshow").setAttribute("src", galleryarray[curimg])
    curimg=(curimg<galleryarray.length-1)? curimg+1 : 0
    setTimeout( rotateimages, 2500);
}

      for (let elements of values) {
        console.log(elements, 'it will work this time');
      }

    //   var array = Object.keys(images_array)
    // .map(function(key) {
    //     return obj[key];
    // });

    // console.log(array, 'hurrraaaaaaaayyyyyyyyy'); 
      // var str_keys = JSON.stringify( Object.keys(images_array))
      // console.log(str_keys, 'string keys')

      // var str_values = JSON.stringify( Object.values(images_array))
      // console.log(str_values, 'string values')

      // var str_values2 = JSON.parse( Object.values(images_array))
      // console.log(str_values2, 'parse values')
// console.log(images_array.fill(0).map((_, i) => i * i), 'my oh my');

for (const value of Object.values(images_array)) {
  
  console.log(value, 'for each value');
  var links = []
  console.log(JSON.stringify(value), 'for each strigyfy value')
  // var links_array = JSON.stringify(value)
  // links.push(links_array)
  // console.log(links, 'links')


// var galleryarray = images_values;// image container


// rotateimages();
// var curimg=0
// function rotateimages(){
//     document.getElementById("slideshow").setAttribute("src", galleryarray[curimg])
//     curimg=(curimg<galleryarray.length-1)? curimg+1 : 0
//     setTimeout( rotateimages, 2500);
// }


}
    



    
    
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
