<template>
    <div>
        <div class="floor-title" >
            {{floorTitle}}
        </div>
        <div class="shop-floor">
            <div class="floor-Irregularity" >
                <div class="floor1-one">
                    <img :src="floorData0.image" width="100%">
                </div>
                <div>
                    <div class="floor1-two">
                        <img :src="floorData1.image" width="100%">
                    </div>
                    <div>
                        <img :src="floorData2.image" width="100%">
                    </div>
                </div>
            </div>
            <div class="floor-regular">
                <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                floorData0: {},
                floorData1: {},
                floorData2: {}
            }
        },
        props:['floorData','floorTitle'],
        watch:{
            floorData:function(val){
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
            }
        }
    }
</script>

<style scoped>
    .shop-floor {
        background-color: #fff;
    }
    .floor-title {
        height: 1.8rem;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.8rem;
    }
    .floor-Irregularity {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
    }
    .floor-Irregularity div {
        width: 10rem;
        border-bottom: 1px solid #ddd;
    }
    .floor1-one {
        border-right: 1px solid #ddd;
    }
    .floor-regular {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background-color: #fff;
    }
    .floor-regular div {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width:10rem;
        border-bottom:1px solid #ddd;
    }
    .floor-regular div:nth-child(odd){
      border-right: 1px solid #ddd;
    }
</style>