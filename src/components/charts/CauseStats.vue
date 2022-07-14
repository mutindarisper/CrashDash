
<script>
import axios from "axios"
import { Doughnut  }  from 'vue-chartjs';

var baseurl = 'http://45.63.48.25:8080'


export default {
   extends:Doughnut,
   data() {
      return {
          color_info_fromServer:{},
          names_candidates:[],
          chartDataFromServer:[],
          chatData_restructure: {
             labels:[],
             datasets:[]

          }
          ,
         
         //Chart.js options that controls the appearance of the chart
         options: {
            // scales: {
            //    xAxes: [{
            //     //   stacked: true,
                  
                  
            //       ticks: {
            //          beginAtZero: true,
                  
            //          // fontColor: '#2FA036',
            //       },
            //       gridLines: {
            //          display: true
            //       }
            //    }],
            //    yAxes: [{
            //     //   stacked: true,
                  
            //            barPercentage: 0.85,
                     
            //        ticks: {
            //           beginAtZero: true,
                       
            //          // fontColor: '#2FA036',
            //          fontSize: 10,
            //       },
            //       gridLines: {
            //          display: false,
                     
            //       }
            //    }]
            // },
      //        tooltips: {
      //     enabled: true,
      //     callbacks: {
      //       label: ((tooltipItems) => {
      //         console.log(this)
      //         return tooltipItems.yLabel + '£' +   this.chart_data.datasets[0].toString() 
      //       })
      //     }
      //   },
           legend: {
               display: true,
               position: 'right',
               margin: 20,
               labels:{
                  fontColor: '#fff',
                  fontWeight: 'bold',
                  padding: 15,
                  usePointStyle: true,
                  pointStyle: 'circle'
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
      cause:{
         type:String
      },
      county:{
         type: String
      }

  },
  computed: {
    check_data (){
    
       return{
          cause: this.cause,
          county: this.county,
          
            
       }
       
    }

  },
  watch:{
   check_data(){
this.getCountyStats();

   },
   deep: true

  },
   mounted() {
    
      this.getCountyStats();
      
    //    this.renderChart(this.chart_data, this.options)
   },
   methods: {
        getCountyStats() {
     
            var county= this.county
             console.log(county, 'STATS COUNTY')

             var cause = this.cause
                 console.log(cause, 'STATS CAUSE')
             
          

                const outPut = axios.get(baseurl+'/HotSpots/get_statics/?county='+county+'&cause='+cause)
            
                    .then((response) => {
                         const responseData = response.data.statistics
      
                        this.chartDataFromServer = responseData 
                        // console.log(responseData , 'causes statistics')   
                        
                         var stats_data = {'labels':[], 'values':[]}

                          responseData.map( item => {
                             const key =  Object.keys( item)
                             stats_data[key] = item[key]
                    

                            stats_data['labels'].push(key[0])
                            stats_data['values'].push(item[key])

                           })

                        //    console.log(stats_data, 'labels and data')
                            var Labels = stats_data.labels
                            
                            var Data = stats_data.values
                       
                         setTimeout(() => {


                        // test for chart dynamically
                        var chartDataNew = this.chartDataFromServer

                        var mychart_data = []   //no. of blackspots per road

                        // generate names for road labels 
                        var names_labels = []

                        // const places_names = Object.keys(chartDataNew[0]).slice(1)
                        
                        // chartDataNew.map((name =>{

                        //    var majina = Object.values(name).slice(0,1)
                           
                           
                        //    names_labels.push(majina[0])

                         
                           

                        // }))

                        var Doughnut_data = {}

                        var colors_a = ['#ffbb33', '#99cc00', '#ffc7c8', '#33b5e5',  '#ABCDC6', '#ffc7c8', '#9a5fb8', '#32a6b5',  '#ABEBC6']


                        chartDataNew.map((item =>{

                           var data_values = Data //Object.values(item).slice(1)
                        
                         


                        //   Doughnut_data[item.candidate] = data_values

                        //    colors_a.push(this.color_info_fromServer[item.candidate]['color'])
                       
                           
                        }))

                       

                       
                        this.chatData_restructure.labels = Labels 
                        this.chatData_restructure.datasets= Data

                        // this.names_candidates = names_labels
                        // var Datavalues_out = []

                        
                        // names_labels.map((name=>{

                        //     var sum_per_candidate = Doughnut_data[name].reduce((a, b) => a + b, 0)

                        //     Datavalues_out.push(sum_per_candidate)
                            


                         


                        // }))

                     

                        var datasetStructure =  [{
                              data: Data,
                                 label: Labels,
                                 backgroundColor:colors_a,
                                 fill:true
                           }]
                            

                     


                        this.chatData_restructure.labels = Labels

                        // console.log(this.chatData_restructure.labels, 'labels only')
                        this.chatData_restructure.datasets= datasetStructure
                        //  console.log(this.chatData_restructure.datasets, 'data only')

                          







                        // console.log(this.chart_data, 'data ACTUAL   .')

                        // console.log(this.chatData_restructure, 'data   .')

                          

                        
                        this.renderChart(this.chatData_restructure, this.options)
                        console.log( this.chatData_restructure, 'DATA TYPE OF CHART' )
                
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
<style scoped>
#legend-container ul {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 2em;
}
</style>
