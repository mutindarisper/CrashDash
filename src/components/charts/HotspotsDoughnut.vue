<script>
import axios from "axios"

import { Doughnut,  }  from 'vue-chartjs';


export default {
   extends: Doughnut, 
   data() {
      return {
         
         chart_data: {
             labels: [],
             datasets:[{
                 label:'',
                 backgroundColor:  ['#ffbb33', '#99cc00', '#9a5fb8', '#33b5e5',  '#ABEBC6'],
                
               pointBackgroundColor: 'white',
               borderWidth: 1,
               pointBorderColor: '#249EBF',
                 data:[]
             }

                 ],

         },

          
         
         //Chart.js options that controls the appearance of the chart
         options: {
            // scales: {
            //    yAxes: [{
            //       ticks: {
            //          beginAtZero: false,
            //          // fontColor: '#2FA036',
            //       },
            //       gridLines: {
            //          display: true
            //       }
            //    }],
            //    xAxes: [{
            //        ticks: {
            //           beginAtZero: false,
            //          // fontColor: '#2FA036',
            //          // fontSize: '2px',
            //       },
            //       gridLines: {
            //          display: false,
                     
            //       }
            //    }]
            // },
            legend: {
               display: false,
               labels:{
                  fontColor: '#2FA036',
                  fontWeight: 'bold'
               }
            },
            
            responsive: true,
            maintainAspectRatio: false,
          
         }
      }
   },
  props: {
      label: {
         type: String
      },
      chartData:{
         type: Array
      },
      // options:{
      //    type: Object
      // },
      year:{
         type:String
      },
      county_data:{
         type: String
      }

  },
  computed: {
    check_data (){
       return{
          year: this.year,
          county_data: this.county_data
            
       }
    }

  },
  watch:{
   check_data(){
this.getCountyStats();

   }

  },

   mounted() {
      //renderChart function renders the chart with the datacollection and options object.
    //   this.update_chartData()
      this.getCountyStats();
      
    //    this.renderChart(this.chart_data, this.options)
   },

   methods: {

        getCountyStats() {
         var baseurl = 'http://192.168.1.22:8100'
     
            // var county_data = this.county_data
            //  console.log(county_data, 'county name')
            //   county_data = this.selected_county.name;
            //   var year = this.year
               

            //   window.year = 2020;

                const outPut = axios.get(baseurl+'/HotSpots/get_hotspot_per_county/?statistics=all')
            
                    .then((response) => {
                         const responseData = response.data.statistics
                           console.log(responseData, 'chart data')

                           var stats_data = {'labels':[], 'values':[]}

                           responseData.map( item => {
                             const key =  Object.keys( item)
                             stats_data[key] = item[key]
                    

                            stats_data['labels'].push(key[0])
                            stats_data['values'].push(item[key])

                           })
                            var Labels = stats_data.labels
                            
                        // console.log(stats_data, 'labels')

                        var Data = stats_data.values


                        // const key =  Object.keys( responseData)
                        // console.log(stats_data, 'keys')
                        
                       
                       

                           //get all keys
                        //  const array_key =   responseData.keys();
                        //  console.log(array_key, 'array keys')

                         


                        // console.log(response.data.sub_counties);
                        // const Labels =  responseData.map(item =>  item.Kiambu)
                        // console.log(Labels, 'labels')
                        // const Data = responseData.map(item => item.Bites)
                        // console.log(Data)
                        
                         setTimeout(() => {
                // this.chart_data.datasets[0].label = 'Snake Bites'+' '+year
                         this.chart_data.datasets[0].data = Data
                        this.chart_data.labels = Labels
                        this.renderChart(this.chart_data, this.options)
                
                            }, 1000)
                

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })
        
            return  outPut
        },
   }
}

</script>