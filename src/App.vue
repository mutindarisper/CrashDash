<template>
  <div id="app">

    <div class="navbar">
      <div class="dash_logo">
        <img src="./assets/images/logo.png" alt="">
      </div>

      <div class="tagline">
        Providing Information on Major Blackspots in Kenya
      </div>

      <div class="links">
        <a class="home"  href="https://www.stjohnkenya.org/" target="_blank" >Home</a>
        <div class="dashboard">Dashboard</div>
        <div class="mapographics">Mapographics</div>


      </div>

      <div class="logo2">
        <img src="./assets/images/logo2.png" alt="">
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

      <span class="facilities">Health Facilities</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select a facility'"
      class="select_facility"
      @input="displayToKey($event)"
    />


   

  <button class="stats" @click="handle_selected_component('chart_container')" type="button">Load Statistics</button>


    
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

     <div class="info">

      -- Click the point on the map to fill the data --
       <br>
       <br>
      <b>Blackspot:</b><div class="name"></div>
      <br>
      <b>County:</b><div class="county"></div>
      <!-- <br> -->
      <!-- <b>Route:</b><div class="route"></div>
      <br> -->
      <b>Cause:</b><div class="cause"></div>
      <br>
      <b>Mitigation:</b><div class="mitigation"></div>
      <br>
      <!-- <div class="separator"></div> -->
      <!-- <br> -->
      <b>Additional Information</b>
       <br>
       <!-- <img src={{img_url}} alt=""  class="media">  -->
        <img class="media"
        src=""
        
      />  
      <!-- <div class="media"> <p/></div> -->

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


delete Icon.Default.prototype._getIconUrl;
// Icon.options.shadowSize = [0,0];
Icon.Default.mergeOptions({
  iconRetinaUrl: require("../src/assets/images/marker.svg"), //../src/assets/images/red-pin.svg
   iconUrl: require("../src/assets/images/marker.svg"),
  // iconUrl: require("../src/assets/images/red-pin.svg"),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png' marker  D:\SNAKE_BITES\Kenya_Snakebites_Information_Platform\src\assets\images\hosp.svg),
  shadowSize: [0, 0],
});



var baseurl = 'http://192.168.1.29:8100'

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
      analysis: true,
      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      selected_county: '',
      routes: [],
      causes:[],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],
      charts: false,
      img_url: ''

    }

   },
   mounted() {
   
    this.setupLeafletMap();
    
    // this.load_all_hotspots();
      this.getRoutesList();
  this.onEachPoint();

    this.handle_point_data();
    
   },
   computed: {
    check_data() {
      return {
        url: this.img_url
      }
      
    }
    

   },
   watch: {
    check_data (){
      this.onEachPoint();
    }

   },

   methods: {

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
          this.current_point = L.circleMarker(cordinates, {
            fillColor: "#fcba03",
            color: point_color,
            radius: 3,

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

        

        
          //  this.current_point.setRadius(this.pointStyle);
          this.current_point.addTo(this.points_layerGroup);
         
          this.map.fitBounds(window.markers.getBounds(), {
            padding: [50, 50],
          });

          // this.map.addLayer(markers);

          return `${key}`;
        }
      });

      window.markers.addTo(this.map);
    },

    load_all_hotspots() {

        axios.get('http://192.168.1.29:8100/HotSpots/'
                    )
           .then((response) => {
                         console.log( response.data,'hotspot data' );

                         const hotspot_data = response.data 
                          // if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                         console.log(response.data.features[0].properties.Reasons, 'PRE reasons')
                        
                               this.current_hotspots = L.geoJSON(hotspot_data, { }).addTo(this.map);
                                               
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

      
      
        axios.get('http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?road_names='+county
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


             axios.get('http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?road_points='+route
                    )
           .then((response) => {
                         console.log( response.data,'points in routes');
                         var region_hotspots = response.data
                          //  if (this.point_hotspot !== null) this.map.removeLayer(this.point_hotspot);

                         this.point_hotspot = L.geoJSON(region_hotspots, {
                          onEachFeature: this.onEachPoint
                          }).addTo(this.map);
                          this.map.fitBounds( this.point_hotspot.getBounds(), {
                            padding: [50, 50],
                          });
                                                        
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })


    },

    onEachPoint( feature, layer) {

    
       layer.on('click', function(e) {

        // this.img_url = <img src={feature.properties.AdditionalInfo.image}  />
    $(".name").html(feature.properties.BlackspotName);
    $(".county").html(feature.properties.County);
    $(".route").html(feature.properties.RoadName);
    $(".cause").html(feature.properties.Reasons);
    $(".mitigation").html(feature.properties.Mitigation);
    $(".media").find('img')['prevObject'][0].src = feature.properties.AdditionalInfo['image']
    $(".media").find('img')['prevObject'][0].src;

    //  console.log(this.img_url, 'url')
    // return src
 
   
  });

      },

  getImgUrl() {
    var images = this.img_url
    return images
  },
  imageGen(url){

    return (<img src={url} alt=""  class="media"/>)

     

  },

    getCausesList() {
      var county =  window.county_data
      axios.get('http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?list_causes_per_county='+county
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


             axios.get('http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?hotspot_per_cause='+cause
                    )
           .then((response) => {
                         console.log( response.data,'points in causes');
                         var cause_hotspots = response.data
                          //  if (this.point_hotspot !== null) this.map.removeLayer(this.point_hotspot);

                         this.point_hotspot = L.geoJSON(cause_hotspots , { }).addTo(this.map);
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
