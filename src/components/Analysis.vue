<template>
     <div class="analysis">
      
        
      <img src="../assets/images/yyy.png" alt="" style="width: 460px;
height: 750px; position: absolute; top: 7vh" class="analysis_outline">
      <div class="selections">
        <span class="region">Region</span>

  <!-- test for custom select   'Select region' -->  
   <CustomSelect
      :default="'Select region'"
      :options="this.counties"
      class="select_region"
      @input="modify_default($event);displayToKey($event);getRoutesList();getCausesList()"
    />

    <!-- <select v-model="selected_county_1" class="county-data" name="" id=""  @change="displayToKey($event);getRoutesList();getCausesList()">
         
        <option v-for="county in counties" :value="{'name':county}" :key="county">{{ county }} </option>
        
    </select> -->

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
      :options="this.hazard "
      :default="'Select hazard'"
      class="select_hazard"
      @input="getHarzardList();display_hazard_name($event);getHazardPoints()"
     
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


    
   
</template>

<script>
import CustomSelect from './CustomSelect.vue'
import CustomSelectCause from './CustomSelectCause.vue'
import axios from "axios"

var baseurl = 'http://45.63.48.25:8080'
export default {
  // props: {
  
  //   name_county: {
  //     type: String,
      
  //   },
    
  // },

// computed: {
//     check_data (){
    
//        return{
        
//           name_county: this.name_county,
          
            
//        }
       
//     }

//   },

//    watch:{
//    check_data(){
// this.displayToKey();


//    },
//    deep: true

//   },
 

  // props: {
  
  //   default: {
  //     type: String,
  //     required: false,
  //     default: null,
  //   },
    
  // },


//     computed: {
//     check_data (){
    
//        return{
//           default: this.$children[0].$options.propsData.default
//           // county: this.county,
          
            
//        }
       
//     }

//   },
//   watch:{
//    check_data(){
// this.displayToKey();
// // console.log(this.default, 'this is a default')

//    },
//    deep: true

//   },
    
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

      counties: [ 'Kiambu', 'Laikipia', 'Meru', 'Embu', 'Nyeri'],
      selected_county: '',
      selected_county_1: '',
      routes: [],
      causes:[],
      mitigation:[],
      hazard:[],
      radius: ['1km', '2km', '5km', '', 'Nyeri'],
      name_county:'',
       message: 'hello hello!',
      default_: ' '
      

        }
    },

  // provide() {
  //   // use function syntax so that we can access `this`
  //   return {
  //     message: this.message
  //   }
  // },

  //    provide() {
  //     console.log(this.selected_county , 'this.selected_county in provide')
  //       //  console.log(this.default_ , 'this.default in provide')
  //   // use function syntax so that we can access `this`
  //   return {
  //     selected_county: this.selected_county ,
  //     // default_: this.$children[0].$options.propsData.default
  //   }
  // },
    methods:{


modify_default($event) {
  this.default_ = $event
  console.log(this.default_, 'first default')
  if (this.default_ === ' ') {
    this.default_ = $event
    return this.$emit('updated_default',this.default_)

  }
   return this.default_

},

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
  this.selected_county = data
   window.county_data = $event
  window.name= this.$children[0].$options.propsData.default
   this.$children[0].$options.propsData.default = this.selected_county 

var name_county = this.name_county
// console.log(name_county, 'name county')

this.selected_county = name_county
// console.log(this.selected_county, 'updated selected county')

//  this.$emit('selected_county_1', this.selected_county)

// var name_county = this.selected_county
// console.log(name_county, 'name county')
   this.default_ = this.$children[0].$options.propsData.default


  //  console.log(this.$children[0].$options.propsData.default, 'default values')
  //  console.log(this.selected_county, 'selected  county data') //.features[0].properties.county_name
   this.$emit('selected_county_1',  this.default_)

   //test
  //  var county_data = this.selected_county_1.name;
  //  this.$emit('selected_county_1', county_data)
 

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

    },
     getHarzardList() {
      var county =  window.county_data
      console.log(county, 'selected county for harzard')

        axios.get(baseurl+'/HotSpots/get_by_hazard/?hazard_list=All'
                    )
           .then((response) => {
                        //  console.log( response.data,'routes data' );
                          this.hazard= response.data.hazard
                          // window.routes =   response.data.Routes  
                                  
                     console.log(response.data.hazard, 'hazard array')

            return response.data.hazard
            
    

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })


    },
      display_hazard_name($event){
      window.hazard_name = $event
      console.log( window.hazard_name, 'hazard name')
      // this.$emit('selected hazard',  window.hazard_name )

    },
     getHazardPoints() {
      // this.displayToKey();
      var county =  window.county//.features[0].properties.county_name
      
      console.log(county, 'hazard COUNTY')
      // this.$emit('selected_county', county)

      var hazard = window.hazard_name
       console.log(hazard, 'hazard name name')


        axios.get(baseurl+'/HotSpots/get_by_hazard/?county='+county+'&hazard='+hazard
                    )
           .then((response) => {
                         console.log( response.data, 'hazard points');
                         var hazard_hotspots = response.data
                         return this.$emit('points_per_cause', hazard_hotspots)
                     
                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })

    },




   

    }

}
</script>

<style scoped>
@import "../assets/app.css";

</style>