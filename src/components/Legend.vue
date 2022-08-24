<template>
<div class="wrapper">
 <div class="legend">
    <span class="label">Blackspot Risk Severity</span>
    <div class="content">
    <img class="icons" src="../assets/images/marker.svg" alt="">
    <span class="labels">Moderately High</span>
    <img class="icons" src="../assets/images/green-pin.svg" alt="">
    <span class="labels">High</span>
    <img class="icon" src="../assets/images/fin.svg" alt="">
    <span class=labels>Very High</span>
    <img class="icons" src="../assets/images/red-pin.svg" alt="">
    <span class=labels>Extremely High</span>
    </div>
    

  </div>
</div>
 
</template>

<script>
export default {

}
</script>

<style scoped>
.wrapper{
    height: 250px;
    width: 200px;
    background-color: #000;
    border-radius: 10px;
    cursor: pointer;

}

 @media screen 
  and (min-device-width: 1200px) 
  and (max-device-width: 1600px) 
  and (-webkit-min-device-pixel-ratio: 1) { 
     .wrapper {
    position:relative;
        top: -10.5vh;
      left: 10vw;
      width: 220px;
    }

}

  /* @media(min-width:1025px) and (max-width:1400px) {
    .wrapper {
    position:relative;
        top: -2.5vh;
      left: 27vw;
      width: 220px;
    }
    
  }
    @media (min-width:769px) and (max-width:1024px) {
    .wrapper {
    position:relative;
        top: -2.5vh;
      left: 27vw;
      width: 220px;
    }
    
  } */
.legend, .content{
    position: relative;
    top: 1vh;
    margin-top: 5px;
      display: flex;
    flex-direction: column;
    padding: 5px;
    gap: -2px;
color: #fff;
     font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        font-size: 14px;
}
.icons{
    height: 31px;
    width: 25px;
}
.icon{
    /* position: relative;
    top: -0.5vh; */
    height: 25px;
    width: 24px;
}
.labels{
    position: relative;
    top: -2.7vh;
    left: 1.5vw;
}
.label{
    position: relative;
    font-weight: bold;
    /* top: -2.7vh; */
    left: 1vw;
}

</style>