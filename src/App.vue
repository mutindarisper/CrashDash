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

    <div class="analysis">
      <img class="close_analysis" src="./assets/images/close.svg" alt="">

      <span class="region">Region</span>
<div class="select" id="region_data" tabindex="1">
  <input class="selectopt" name="test" type="radio" id="opt1" checked>
  <label for="opt1" class="option">Kiambu</label>
  <input class="selectopt" name="test" type="radio" id="opt2">
  <label for="opt2" class="option">Laikipia</label>
  <input class="selectopt" name="test" type="radio" id="opt3">
  <label for="opt3" class="option">Meru</label>
  <input class="selectopt" name="test" type="radio" id="opt4">
  <label for="opt4" class="option">Embu</label>
  <input class="selectopt" name="test" type="radio" id="opt5">
  <label for="opt5" class="option">Nyeri</label>
</div>


     <span class="routes">Routes</span>
<div class="select2" id="region_data" tabindex="1">
  <input class="selectopt2" name="test" type="radio" id="opt1" checked>
  <label for="opt1" class="option">Kiambu</label>
  <input class="selectopt" name="test" type="radio" id="opt2">
  <label for="opt2" class="option">Laikipia</label>
  <input class="selectopt" name="test" type="radio" id="opt3">
  <label for="opt3" class="option">Meru</label>
  <input class="selectopt" name="test" type="radio" id="opt4">
  <label for="opt4" class="option">Embu</label>
  <input class="selectopt" name="test" type="radio" id="opt5">
  <label for="opt5" class="option">Nyeri</label>
</div>



    
    </div>
    <div class="map" id="map" style="height: 98vh; width: 100%">

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




export default {
   name: "App",
   components:{

   },
   data() {

    return{
       center: [0.02, 37.8582273], // set initial map center
      map: null, //instance of map object,
      base_map_ctrl_selections: false, //show or hide base layers
      base_map_ctrl_cliked: false,
      baseMaps: {},

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
