<template>
    <div>
        <div>
            <van-nav-bar title="商品分类"/>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="left-nav">
                        <ul>
                            <li @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}"   v-for="(item,index) in category" :key="index">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div>
                        <van-tabs v-model="active" @click="clickCategorySub">
                            <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="goodsOnRefresh">
                            <van-list v-model="loading" :finished="finished" @load="goodsOnLoad">
                                <div class="list-item" @click="goGoodsInfo(item.ID)" v-for="(item,index) in goodsList" :key="index">
                                    <div class="list-item-img">
                                        <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                                    </div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div>￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import URL from '@/serviceAPI.config.js'
    import { Toast } from 'vant';
    import {toMoney} from '@/filter/moneyFilter.js'
    export default {
        data() {
            return {
                category: [],
                categoryIndex:0,
                categorySub: [],
                active:0,
                page:1,
                categorySubId:'',
                goodsList:[],
                loading: false,
                finished: false,
                isRefresh: false,
                errorImg: 'this.src="' + require('@/assets/images/errorimg.png') + '"'   ,  //错误图片显示路径
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        created(){
            this.getCategoryList()
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight;
            document.getElementById("left-nav").style.height = winHeight-46-50+'px'
            document.getElementById("list-div").style.height = winHeight-90-50+'px'
        },
        methods: {
            getCategoryList() {
                axios({
                    url:URL.getCateGoryList,
                    method:'get'
                })
                .then(response=>{
                    console.log(response)
                    if(response.status==200 && response.data.message){
                        this.category = response.data.message
                        this.getCategorySubListByCategoryId(this.category[0].ID)
                    }else {
                        Toast('服务器错误，读取数据失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            getCategorySubListByCategoryId(categoryId){
                axios({
                    url:URL.getCateGorySubList,
                    method:'post',
                    data:{categoryId:categoryId}
                })
                .then(response=>{
                    
                    if(response.status==200 && response.data.message){
                        this.categorySub = response.data.message
                        console.log(response)
                        this.active = 0
                    }else {
                        Toast('服务器错误,读取数据失败')
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            clickCategory(index,categoryId){
                this.categoryIndex=index
                this.page=1
                this.finished = false
                this.goodsList=[]
                this.getCategorySubListByCategoryId(categoryId)
            },
            goodsOnLoad(){
                setTimeout(()=>{
                    this.categorySubId=this.categorySubId?this.categorySubId:this.categorySub[0].ID
                    this.getGoodsList()
                },1000)
            },
            goodsOnRefresh(){
                setTimeout(()=>{
                    this.isRefresh = false
                    this.finished = false
                    this.goodsList=[]
                    this.page=1
                    this.goodsOnLoad()
                },500)
            },
            getGoodsList(){
                axios({
                    url:URL.getGoodsListByCategorySubID,
                    method:'post',
                    data:{
                        categorySubId:this.categorySubId,
                        page:this.page
                    }
                })
                .then(response=>{
                    console.log(response)
                    if(response.data.code == 200 && response.data.message.length ){
                        this.page++
                        this.goodsList=this.goodsList.concat(response.data.message)
                    }else{
                            this.finished = true;
                    }
                    this.loading=false;
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            clickCategorySub(index,title){
                this.categorySubId= this.categorySub[index].ID
                console.log(this.categorySubId)
                this.goodsList=[]
                this.finished = false
                this.page=1
                this.goodsOnLoad()
            },
            goGoodsInfo(id){
                this.$router.push({name:'Goods',params:{goodsId:id}})
            }
        },
    }
</script>

<style scoped>
    #left-nav {
        background-color: aliceblue;
    }
    #left-nav ul li {
        height: 2rem;
        font-size: 0.8rem;
        padding: 3px;
        border-bottom: 1px solid #e4e7ed;
        line-height: 2rem;
        text-align: center;
    }
    .categoryActive{
        background-color: #fff;
    }
    #list-div {
        overflow: scroll;
    }
    .list-item {
        display: flex;
        flex-direction: row;
        font-size:0.8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding:5px;
    }
    .list-item-img{
        flex:8;
    }
    .list-item-text{
        flex:16;
        margin-top:10px;
        margin-left:10px;
    }
</style>