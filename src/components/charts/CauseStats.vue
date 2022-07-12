
<script>
import axios from "axios"
import { Doughnut  }  from 'vue-chartjs';


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
               display: false,
            //    labels:{
            //        generateLabels() {
            //   return this.names_candidates.map((label2, index) => ({
            //     text: label2,
            //     // fillStyle: barBackgroundColors[index]
            //   }))
            // },

                  
            //       fontColor: 'gray',
            //       fontWeight: 'bold'
            //    }
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
      },
      cause_data:{
          type: String
      }
  },
  computed: {
    check_data (){
       return{
        //   year: this.year,
          county_data: window.county_data, 
        //   cause_name: window.cause_name
            
       }
    }
  },
  watch:{
   check_data(){
this.getCountyStats();
   },
//    immediate: true,
  },
   mounted() {
    
      this.getCountyStats();
      
    //    this.renderChart(this.chart_data, this.options)
   },
   methods: {
        getCountyStats() {
     
            // var county_data = this.county_data
            //  console.log(county_data, 'county name')
            // //  var selected_position = this.position_data

            // var cause_data = this.cause_data
            //  console.log(this.cause_data, 'cause name')

            var county2 =  county_data 
             console.log(county2, 'COUNTY 222222222222')
            //  var county3 = this.$parent.displayToKey['TargetFunction']
            //  console.log(county3, 'COUNTY 333')


            //  var cause2 = cause_name
            //  console.log(cause2, 'CAUSE 22222222222222')

             
          



                const outPut = axios.get('http://192.168.1.41:8100/HotSpots/get_statics/?county=Kiambu&cause=Infrastructural')
            
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
