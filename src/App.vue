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
        <a class="home"  href="https://www.stjohnkenya.org/">Home</a>
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
      @input="displayToKey($event)"
    />

     <span class="routes">Route</span>
   <CustomSelect
      :options="this.routes"
      :default="'Select a route'"
      class="select_route"
      @input="displayToKey($event)"
    />
     <span class="causes">Cause</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select a cause'"
      class="select_cause"
      @input="displayToKey($event)"
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
   
  </div>
</template>
<script>
import "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import axios from "axios"
import baseLayers from "./Helpers/baseLayers";
import CustomSelect from "./components/CustomSelect.vue"


delete Icon.Default.prototype._getIconUrl;
// Icon.options.shadowSize = [0,0];
Icon.Default.mergeOptions({
  iconRetinaUrl: require("../src/assets/images/marker.svg"),
  iconUrl: require("../src/assets/images/marker.svg"),
  // shadowUrl: require('leaflet/dist/images/marker-shadow.png'  D:\SNAKE_BITES\Kenya_Snakebites_Information_Platform\src\assets\images\hosp.svg),
  shadowSize: [0, 0],
});



var baseurl = 'http://192.168.1.29:8100'

export default {
   name: "App",
   components:{
    CustomSelect

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
      chart_container: false,
      analysis: true,
      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      routes: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      causes:['Speeding', 'Sharp Bend', 'Overtaking', 'No Road Sign', 'Pedestrian Recklessness'],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],

    }

   },
   mounted() {
    this.setupLeafletMap();
    
    this.load_all_hotspots();
    
   },

   methods: {

    //  handle_point_data(val) {
    //   if (this.current_hotspots !== null) {
    //     window.markers.clearLayers();
    //   }

    //   window.markers = new L.featureGroup();
    //   this.points_layerGroup = window.markers;
    //   // var radius = this.pointStyle;

    //  axios.get('http://192.168.1.29:8100/HotSpots/'
    //                 )
    //        .then((response) => {
    //                      console.log( response.data,'hotspot data' );

    //                      window.hotspot_data = response.data 
    //                       // if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                         
                        
    //                            this.current_hotspots = response.data
    //                             console.log(window.hotspot_data , 'hotspots inside fn')
                                               
                        

    //                      var points = val; //.features[0]['geometry'] dewewewe

    //   this.map.createPane("rasters");
    //   this.map.getPane("rasters").style.zIndex = 500;

    //   Object.entries(points.features).forEach(([key, value]) => {
    //     if (key) {
    //       this.current_hotspots = L.circleMarker(
    //         [value.geometry.coordinates[1], value.geometry.coordinates[0]] );
    //       // var size = value.properties.registered_voters2013/100; //divided by 100 to resize the markers

        

    //       //  this.current_point.setRadius(this.pointStyle);
    //       this.current_hotspots.addTo(this.points_layerGroup)
    //       this.map.fitBounds(window.markers.getBounds(), {
    //         padding: [50, 50],
    //       });

    //       // this.map.addLayer(markers);

    //       return `${key}`;
    //     }
    //   });

    //   window.markers.addTo(this.map);

      
                        
                      

    //                 })
    //                .catch( (error) => {
    //             console.log('an error occured ' + error);
    //         })


            






     
    // },


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
  console.log( data, "event")
  
  if (data === 'Kiambu') {
    console.log('Kiambu selected')
  } else{
    console.log('other counties selected')
  }

  

 

    if(data){ 
       if (this.current_geojson) this.map.removeLayer(this.current_geojson);
                    axios.get('http://192.168.1.29:8100/AdminData/get_adm1_shapefile?Get_county='+data 
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

                         axios.get('http://192.168.1.29:8100/Roads/?county='+data 
                    )
           .then((response) => {
                        //  console.log( response.data,'roads data' );

                         const road_data = response.data 
                          if (this.current_road) this.map.removeLayer(this.current_road);
                         
                        
                               this.current_road = L.geoJSON(road_data, {
                                      style: {
                                        color: "red",
                                        weight: 0.5,
                                      },
                                    }).addTo(this.map);
                                               
                        return response.data
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })                                                             
                        return response.data
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

          // const blackspots =  axios.get('http://192.168.1.29:8100/HotSpots/'
          //           )
          //  .then((response) => {
          //                console.log( response.data,'hotspot data' );

          //                const hotspot_data = response.data 
          //                 // if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                         
          //                window.layerGroup = new L.LayerGroup()
                        
          //                      this.current_hotspots = L.Marker(hotspot_data, {
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
            // var overlayMaps = 


            // console.log('overlay map', overlayMaps)

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

  

   }

   

  
}
</script>


<style scoped>
@import "./assets/app.css";

</style>
