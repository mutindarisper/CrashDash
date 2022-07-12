<template>
     <div class="analysis">
      <img class="close_analysis"  @click="close_container('analysis');handle_selected_component('start') " src="../assets/images/close_small.svg" alt="">
      <img src="../assets/images/tab_color.png" alt="" style="width: 442px;
height: 750px; position: absolute; top: 8.3vh">
      <div class="selections">
        <span class="region">Region</span>

  <!-- test for custom select  v-if="analysis" -->
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
      @click="handle_selected_component('cause_stats')"
      @input="display_cause_name($event);getCausesList()"
    />

      <span class="hazard">Hazard</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select hazard'"
      class="select_hazard"
     
    />

    <span class="mitigations">Mitigation</span>
     <CustomSelect
      :options="this.causes "
      :default="'Select mitigation'"
      class="select_mitigation"
    
    />

      <!-- <span class="facilities">Health Facilities</span>
   <CustomSelect
      :options="'' "
      :default="'Select a category'"
      class="select_facility"
      @input="displayToKey($event)"
    /> -->

    <button class="stats" @click="handle_selected_component('chart_container')" type="button">Load Statistics</button>

      </div>

  

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
</template>

<script>
import CustomSelect from './CustomSelect.vue'
export default {
    
    mounted() {

    },
    components:{
        CustomSelect

    },
    data() {
        return{

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
      analysis: true,
      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      selected_county: '',
      routes: [],
      causes:[],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],
      charts: false,
      img_url: '',
      alert_panel: false,
      start: false, 
      cause_stats: false

        }
    },
    methods:{
              displayToKey($event) {
   var data = $event
   window.county_data = $event
   console.log(data, 'selected  county data')
  //  this.$emit('selected county',  window.county_data)
  // window.county_data= val;
  // console.log(val, 'county value')
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

                         var county_data = response.data 
                         
                         
                        
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
                        //  console.log( response.data,'hotspot data per county' );

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

    }

}
</script>

<style scoped>
@import "../assets/app.css";

</style>