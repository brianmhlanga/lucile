<template>
    <div class="topcurated  px-4 py-4 md:px-6 lg:px-8">
      <div class="font-bold goTo text-3xl toptext text-center">Featured Properties</div>
      <div class="text-700 text-center mb-5 line-height-3">Curated list of the best real estate listings available</div>
    </div>
        <div class="container">
            
      <div class="box">
        <div class="top">
          <img src="https://cdn.pixabay.com/photo/2014/07/10/17/18/large-home-389271__340.jpg" alt="" />
          <span
            ><i class="fas fa-heart"></i><i class="fas fa-exchange-alt"></i
          ></span>
        </div>
        <div class="bottom">
          <h3>Home In Merrick Way</h3>
          <p>
            Enchanting three bedrooms, three bath home with spacious one
            bedroom, one bath...
          </p>
          <div class="advants">
            <div>
              <span>Bedrooms</span>
              <div><i class="pi pi-objects-column"></i><span>3</span></div>
            </div>
            <div>
              <span>Bathrooms</span>
              <div><i class="pi pi-hourglass"></i><span>3</span></div>
            </div>
            <div>
              <span>Area</span>
              <div>
                <i class="pi pi-expand"></i><span>4300<span>Sq Ft</span></span>
              </div>
            </div>
          </div>
          <div class="price">
            <span>For Sale</span>
            <span>$540,000</span>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="top">
          <img src="https://cdn.pixabay.com/photo/2014/07/31/00/30/vw-beetle-405876__340.jpg" alt="" />
          <span
            ><i class="fas fa-heart"></i><i class="fas fa-exchange-alt"></i
          ></span>
        </div>
        <div class="bottom">
          <h3>Villa In Alexandria</h3>
          <p>
            Enjoy serenity of Deering Bay whole day from this spectacular North
            and...
          </p>
          <div class="advants">
            <div>
              <span>Bedrooms</span>
              <div><i class="pi pi-objects-column"></i><span>3</span></div>
            </div>
            <div>
              <span>Bathrooms</span>
              <div><i class="pi pi-hourglass"></i><span>3.5</span></div>
            </div>
            <div>
              <span>Area</span>
              <div>
                <i class="pi pi-expand"></i><span>3500<span>Sq Ft</span></span>
              </div>
            </div>
          </div>
          <div class="price">
            <span>For Sale</span>
            <span>$825,000</span>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="top">
          <img src="https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070__340.jpg" alt="" />
          <span
            ><i class="fas fa-heart"></i><i class="fas fa-exchange-alt"></i
          ></span>
        </div>
        <div class="bottom">
          <h3>Villa In Cairo</h3>
          <p>
            The very best waterfront location in Tahrir square and beside many
            cool places
          </p>
          <div class="advants">
            <div>
              <span>Bedrooms</span>
              <div><i class="pi pi-objects-column"></i><span>3</span></div>
            </div>
            <div>
              <span>Bathrooms</span>
              <div><i class="pi pi-hourglass"></i><span>2</span></div>
            </div>
            <div>
              <span>Area</span>
              <div>
                <i class="pi pi-expand"></i><span>1800<span>Sq Ft</span></span>
              </div>
            </div>
          </div>
          <div class="price">
            <span>For Sale</span>
            <span>$410,000</span>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background-color: #eee;
}
.topcurated {
    margin-top: 60px !important;
}
.container {
    width: 1100px;
    margin-top: 10px !important;
    margin: 100px auto;
    display: flex;
    justify-content: space-between;
}

.container .box {
  width: calc((100% / 3) - 20px);
  background-color: white;
  position: relative;
}

.container .box:first-of-type:before {
  content: "Featured";
  background-color: #ecc36b;
  color: white;
  font-size: 13px;
  padding: 4px 10px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  z-index: 1;
}

.container .box:first-of-type:after {
  content: "";
  border-width: 12px;
  border-style: solid;
  border-color: transparent transparent transparent #ecc36b;
  position: absolute;
  left: 72px;
  top: 0;
  transform: translateY(-50%);
}

.container .box .top {
  position: relative;
  background-color: red;
}

.container .box .top:before {
  content: "";
  width: 100%;
  height: 100%;
  background-color: rgba(43, 187, 175, 0.829);
  position: absolute;
  left: 0;
  top: 0;
  transition: 0.3s;
  opacity: 0;
}

.container .box .top:hover:before {
  opacity: 1;
}

.container .box .top:after {
  content: "View Property";
  color: white;
  font-size: 12px;
  padding: 10px;
  border: 1px solid white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: 0.3s;
  opacity: 0;
}

.container .box .top:hover:after {
  opacity: 1;
}

.container .box .top img {
  width: 100%;
  margin-bottom: -4px;
}

.container .box .top span {
  position: absolute;
  right: 20px;
  bottom: 15px;
  color: white;
  font-size: 20px;
}

.container .box .top span i {
  margin-left: 5px;
}

.container .box .bottom {
    padding: 20px 15px;
    box-shadow: 0 5px 10px 0 rgba(41, 61, 102, .2);
    position: relative;
    border-radius: 10px;
}

.container .box:not(:last-of-type) .bottom:before {
  content: "Hot";
  background-color: #ea723d;
  color: white;
  font-size: 11px;
  padding: 4px 7px;
  position: absolute;
  left: 20px;
  top: -40px;
  z-index: 1;
}

.container .box .bottom h3 {
  font-size: 15px;
}

.container .box .bottom > p {
  margin: 15px 0;
  font-size: 13px;
  line-height: 1.4;
  color: #777;
}

.container .box .bottom .advants {
  display: flex;
}

.container .box .bottom .advants > div {
  margin-right: 15px;
}

.container .box .bottom .advants > div > span {
  font-weight: bold;
  font-size: 12px;
}

.container .box .bottom .advants > div > div {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.container .box .bottom .advants > div > div i {
  color: #777;
  font-size: 22px;
}

.container .box .bottom .advants > div > div > span {
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
}

.container .box .bottom .advants > div > div > span > span {
  color: #777;
  font-weight: normal;
  margin-left: 5px;
}

.container .box .bottom .price {
  margin-top: 20px;
}

.container .box .bottom .price span:first-of-type {
  display: block;
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
}

.container .box .bottom .price span:last-of-type {
  color: #3eaba1;
  font-size: 22px;
}

</style>