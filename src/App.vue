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
      @input="alert(displayToKey($event))"
    />

     <span class="routes">Route</span>
   <CustomSelect
      :options="this.routes"
      :default="'Select a route'"
      class="select_route"
      @input="alert(displayToKey($event))"
    />
     <span class="causes">Cause</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select a cause'"
      class="select_cause"
      @input="alert(displayToKey($event))"
    />
   

  <button class="stats" @click="handle_selected_component('chart_container')" type="button">Load Statistics</button>




    
    </div>

    <div class="chart_container" v-if="chart_container">
        <img class="close_chart_container"
        src="./assets/images/close.svg"
        @click="close_container('chart_container')"
         alt="" >

    </div>

    <div class="map" id="map" style=" height: 98vh; width: 100%">

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
import baseLayers from "./Helpers/baseLayers";
import CustomSelect from "./components/CustomSelect.vue"




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
      chart_container: false,
      analysis: true,
      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      routes: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      causes:['Speeding', 'Sharp Bend', 'Overtaking', 'No Road Sign', 'Pedestrian Recklessness']

    }

   },
   mounted() {
    this.setupLeafletMap();
   },

   methods: {

      zoom_in() {
      this.map.setZoom(this.map.getZoom() + 1);
    },

    zoom_out() {
      this.map.setZoom(this.map.getZoom() - 1);
    },
    handle_selected_component(selection) {
      this[selection] = true;
    
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
        layers: [mapbox],
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
