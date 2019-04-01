<template>
    <div>
        <!--搜索栏-->
        <div>
            <van-row class="search-bar">
                <van-col span="3" class="location">
                    <img :src="LocationIcon" width="80%">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5" class="search-button">
                    <van-button size="mini">搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <!--轮播图-->
        <div class="swipe-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(item,index) in bannerSwipe" :key="index">
                    <img v-lazy="item.imageUrl" width="100%" class="swiper-img">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!--广告栏-->
        <div class="advertesPicture">
            <img v-lazy="advertes" width="100%">
        </div>
        <!--商品推荐滚动栏-->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="100%">
                            <div class="recommend-name">{{item.goodsName}}</div>
                            <div class="recommend-price">￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--商品楼层栏-->
        <floorComponent :floorData="floor1" :floorTitle='floorName.floor1'></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle='floorName.floor2'></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle='floorName.floor3'></floorComponent>
        <!--热卖商品栏-->
        <div class="hot-sell-area">
            <div class="hot-title">
                热卖商品
            </div>  
            <div class="hot-goods">
                <!--使用list组件-->
                <van-list>
                    <van-row gutter="8">
                        <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                            <goodsInfoComponent :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    import floorComponent from '../component/floorComponent'
    import goodsInfoComponent from '../component/goodsInfoComponent'
    import {toMoney} from '@/filter/moneyFilter'
    import URL from '@/serviceAPI.config.js'
    export default {
        data() {
            return {
                swiperOption:{
                    loop:true,
                    slidesPerView:3,
                },
                LocationIcon:require('../../assets/images/location.png'),
                bannerSwipe:[
                    {imageUrl:'https://m.360buyimg.com/babel/jfs/t1/7049/37/14756/85162/5c661f05E8324b41d/37e1e4fae32c7b8f.jpg'},
                    {imageUrl:'https://m.360buyimg.com/babel/jfs/t1/31375/25/1970/95625/5c63c61cEe55dfa41/51483ee4f496222e.jpg'},
                    {imageUrl:'https://m.360buyimg.com/babel/jfs/t1/18941/25/6912/62876/5c652d3fEfcdb3ee4/6cd7627b9bb0c6ac.jpg'},
                ],
                category:[],
                advertes:'',
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                floorName:{},
                hotGoods:[]
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components:{swiper,swiperSlide,floorComponent,goodsInfoComponent},
        created(){
            axios({
                url:URL.getShoppingMallInfo,
                method:'get',
            })
            .then(response=>{
                console.log(response)
                if(response.status==200){
                    this.category=response.data.data.category;
                    this.advertes=response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.recommendGoods=response.data.data.recommend;
                    this.floor1=response.data.data.floor1;
                    this.floor2=response.data.data.floor2;
                    this.floor3=response.data.data.floor3;
                    this.floorName=response.data.data.floorName;
                    this.hotGoods=response.data.data.hotGoods;
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }
</script>

<style scoped>
    .search-bar {
        height: 2rem;
        background-color: #e5017d;
    }
    .location {
        padding-right: .2rem;
        padding-left: .3rem;
    }
    .search-input {
        width: 100%;
        height: 1.3rem;
        background-color: #e5017d;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #fff;
        color: #fff;
    }
    .search-button {
        padding-left: .3rem;
    }
    .swiper-img {
        width: 100%;
        height: 10rem;
    }
    .type-bar {
        margin: 0 .3rem .3rem .3rem;
        background-color: #fff;
        font-size: 14px;
        border-radius: .3rem;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .type-bar div {
        padding: .3rem;
        font-size: 12px;
        flex: 1;
    }
    .recommend-title {
        color: #e5017d;
        padding: .3rem;
        margin-top: .3rem;
        font-size: 16px;
        border-bottom:1px solid #eee;
    }
    .recommend-item {
        font-size: 12px;
        width: 99%;
        text-align: center;
        border-right:1px solid #eee;
    }
    .hot-sell-area {
        text-align: center;
        font-size: 14px; 
    }
    .hot-title {
        height: 2.3rem;
        color: #000;
        line-height: 2.3rem;
    }
    .hot-goods {
        height: 120rem;
        overflow: hidden;
        background-color: #fff;
    }
</style>