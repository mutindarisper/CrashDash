<template>
     <div class="analysis">
     
      <img src="../assets/images/tab_color.png" alt="" style="width: 442px;
height: 750px; position: absolute; top: 8.3vh">
      <div class="selections">
        <span class="region">Region</span>

  <!-- test for custom select  v-if="analysis"   ;getCausesList() -->
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
      @input="display_route_name($event);getRoutePoints()"
      @click="getRoutesList()"
    />

     <span class="causes">Cause</span>
   <CustomSelectCause
      :options="this.causes "
      :default="'Select a cause'"
      class="select_cause"
   
      @input="display_cause_name($event); getPointsCause();handle_selected('chart_container');switch_charts()"
    />

 <span class="view_stats"> Cause Statistics</span>

      <button
       class="display_cause"
       @click="close_container('county_chart');handle_selected('cause_stats')">Load Statistics</button>


      <span class="hazard">Hazard</span>
   <CustomSelect
      :options="this.causes "
      :default="'Select hazard'"
      class="select_hazard"
     
    />

    <span class="mitigations">Mitigation</span>
     <CustomSelect
      :options="this.mitigation "
      :default="'Select mitigation'"
      class="select_mitigation"
     @input="display_mitigation_name($event);getMitigationList();getMitigationPoints()"
    />

      <!-- <span class="facilities">Health Facilities</span>
   <CustomSelect
      :options="'' "
      :default="'Select a category'"
      class="select_facility"
      @input="displayToKey($event)"
    /> -->

    <button class="stats" @click="handle_selected('chart_container')" type="button">Load Statistics</button>

      </div>

  

    <!-- alert panel -->

    <!-- <div class="alert_panel" v-if="alert_panel">
      <span class="info_title">Click the point on the map to display the data </span>
      <button class="alert_button" type="button"  @click="close_container('alert_panel')">OK</button>

    </div> -->


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
import CustomSelectCause from './CustomSelectCause.vue'
import axios from "axios"

var baseurl = 'http://45.63.48.25:8080'
export default {
    
    mounted() {
      this.getRoutesList();
      this.getRoutePoints();
      this.getCausesList();
      this.getPointsCause();
      this.getMitigationList();
      this.getMitigationPoints();

    },
    components:{
        CustomSelect,
        CustomSelectCause

    },
    data() {
        return{

      counties: ['Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      selected_county: '',
      routes: [],
      causes:[],
      mitigation:[],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],
      

        }
    },
    methods:{


         handle_selected(selection) {
      // this[selection] = false;
      this.$emit("selected_component", selection);
    },


      close_container(container) {
         this.$emit("close_component", container)
    // this[container] = false;
  },
    switch_charts(container) {
       this.$emit("selected_chart", container);

    },
              displayToKey($event) {
   var data = $event
   window.county_data = $event
   console.log(data, 'selected  county data')
  //  this.$emit('selected county',  window.county_data)
 

    if(data){ 

     
                    axios.get(baseurl+'/AdminData/get_adm1_shapefile?Get_county='+data 
                    )
           .then((response) => {
                        //  console.log( response.data,'blackspot data' );

                         var county_data = response.data 
                         this.$emit('county_data', county_data)
                         

                               axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?hotspot_per_county='+data
                    )
           .then((response) => {
                        //  console.log( response.data,'hotspot data per county' );

                         const all_hotspot_data = response.data 
                          // if (this.current_hotspots) this.map.removeLayer(this.current_hotspots);
                        //  console.log(response.data.features[0].properties.Reasons, 'PRE reasons')

                         return this.$emit( 'points_per_county', response.data )
                                          
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


//get names of selected routes

  display_route_name($event){
      window.route_name = $event
      console.log( window.route_name, 'route name')

    },

     getRoutePoints() {
    
                      //load points in routes
                         var route = window.route_name
            // console.log(route, 'selected route')


             axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?road_points='+route
                    )
           .then((response) => {
                        //  console.log( response.data,'points in routes');
                         var region_hotspots = response.data
                        return   this.$emit('points_per_route', region_hotspots )

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })
    },


//load points in routes

 getRoutesList() {
      var county =  window.county_data
      console.log(county, 'selected county for routes')

        axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?road_names='+county
                    )
           .then((response) => {
                        //  console.log( response.data,'routes data' );
                          this.routes = response.data.Routes 
                          window.routes =   response.data.Routes  
                                  
                     console.log(response.data.Routes, 'routes array')

            return response.data.Routes
            
    

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })


    },
    display_cause_name($event){
      window.cause_name = $event
      // console.log( window.cause_name, 'cause name')
      this.$emit('selected cause',  window.cause_name )

    },


     getCausesList() {
      var county =  window.county_data
      window.county = county
console.log(county, 'cause county')



      axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?list_causes_per_county='+county
                    )
           .then((response) => {
                        //  console.log( response.data,'routes data' );
                          this.causes = response.data.Causes
                          // window.routes =   response.data.Routes  http://192.168.1.29:8100/HotSpots/get_hotspot_per_county/?hotspot_per_cause=Cc
                                  
                        return response.data.Causes
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })


            // var county =  window.county_data
      
      
           



    },
    getPointsCause() {
      var county =  window.county
      console.log(county, 'CAUSE COUNTY')
      this.$emit('selected_county', county)


        var cause = window.cause_name
            console.log(cause, 'SELECTED CAUSE')
            this.$emit('selected_cause', cause)


             axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?hotspot_per_cause='+cause+'&county='+county
                    )
           .then((response) => {
                         console.log( response.data,'points in causes');
                         var cause_hotspots = response.data
                         return this.$emit('points_per_cause', cause_hotspots)
                     
                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })


    },

     display_mitigation_name($event){
      window.mitigation_name = $event
      // console.log( window.cause_name, 'cause name')
      this.$emit('selected mitigation',  window.mitigation_name )

    },

      getMitigationList() {
      var county =  window.county_data
      window.county = county
console.log(county, 'cause county')



      axios.get(baseurl+'/HotSpots/get_by_mitigation/?mitigation_list=all'
                    )
           .then((response) => {
                        //  console.log( response.data,'routes data' );
                          this.mitigation = response.data.mitigation
                          console.log(response.data.mitigation, 'mitigation')
                    
                        return response.data.Causes
                        
                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })

    },
    getMitigationPoints() {
      // this.displayToKey();
      var county =  window.county.features[0].properties.county_name
      
      console.log(county, 'mitigation COUNTY')
      // this.$emit('selected_county', county)

      var mitigation = window.mitigation_name
       console.log(mitigation, 'mitigation name')


        axios.get(baseurl+'/HotSpots/get_by_mitigation/?county='+county+'&mitigation='+mitigation
                    )
           .then((response) => {
                         console.log( response.data,'mitigation points');
                         var mitigation_hotspots = response.data
                         return this.$emit('points_per_cause', mitigation_hotspots)
                     
                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })

    }


   

    }

}
</script>

<style scoped>
@import "../assets/app.css";

</style>