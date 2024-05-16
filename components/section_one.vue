<template>
<div class="block-content">
  <div class="">
    <div class="surface-section px-4 py-4 md:px-6 lg:px-8">
      <div class="font-bold goTo text-3xl toptext text-center">Featured Properties</div>
      <div class="text-700 text-center mb-5 line-height-3">Some of the best product selection from brands we work with</div>
    </div>
    <feed />
    <static />
    <reviews />
  </div>
</div>
</template>
<style>
.bg-blue {
    background-color: #0052ff !important;
    color: white !important;
}
.text-xl {
    font-size: 15px !important;
}
.goTo {
    font-weight: 600 !important;
    font-size: 25px !important;
    line-height: 100% !important;
}
.toptext {
    margin-bottom: 25px;
}
span.spanC {
    background-color: #0052ff;
    border-radius: 10px;
    color: white;
    padding: 6px;
    height: 10px !important;
}
.feature-card {
    text-align: center;
}
.custom-cards {
    box-sizing: border-box;
    margin: 10px;
    padding: 3rem;
    height: 120px;
    border: solid 1px #03A9F4;
    border-radius: 10px;
    background-color: #fff;
    /* box-shadow: 0 5px 10px 0 rgba(41, 61, 102, .2); */
    cursor: pointer;
    color: #2d3040;
}
.custom-cards:hover {
    background-image: linear-gradient(to right, #0052ff, #8960ff) !important;
    color: #ffffff !important;
}
.custom-cards:hover .top-icon {
    background-color: rgb(255, 255, 255) !important;
    margin: auto;
}
.custom-cards:hover i.pi.text-white.text-2xl {
    color: #0052ff !important;
}
.custom-cards:hover .text-2xl {
    color: #ffffff !important;
}

.custom-cards:hover .Hero-button {
    color: #0052ff !important;
    background-image: linear-gradient(to right,  #fff, #fff) !important;
}

.top-icon {
    margin: auto;
}
</style>