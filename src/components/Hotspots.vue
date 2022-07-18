<template>
  <div class="hotspots">

  </div>
</template>

<script>
import axios from "axios"
var baseurl = 'http://45.63.48.25:8080'
export default {
    mounted() {
this.load_hotspots();
    },

    data() {
        return{ 

        }
    },

    methods: {
        load_hotspots() {
            axios.get(baseurl+'/HotSpots/'
                    )
           .then((response) => {
                         console.log( response.data,'HOTSPOTS data' );
                         
                         
                        return this.$emit("school_data", response.data)
                        
                      

                    })
                   .catch( (error) => {
                console.log('an error occured ' + error);
            })
        }

       

    }

}
</script>

<style scoped>

</style>