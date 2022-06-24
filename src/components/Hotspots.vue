<template>
  <div class="hotspots">

  </div>
</template>

<script>
import axios from "axios"
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
            axios.get("http://192.168.1.29:8100/HotSpots/"
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