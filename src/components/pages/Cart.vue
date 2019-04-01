<template>
    <div>
        <div class="nav-bar-div">
            <van-nav-bar title="购物车"/>
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <div class="cart-list">
            <div class="cart-row" v-for="(item,index) in cartInfo" :key="index">
                <div class="goods-img">
                    <img :src="item.image" width="100%" />
                </div>
                <div class="goods-text">
                    <div class="goods-name">{{item.name}}</div>
                    <van-stepper v-model="item.count" />
                </div>
                <div class="goods-price">
                    <div>
                        ￥{{item.price | moneyFilter }}
                    </div>
                    <div class="counts">
                         X{{item.count}}
                    </div>
                    <div class="allPrice">
                        ￥{{item.price*item.count | moneyFilter }}
                    </div>
                </div>
            </div>
        </div>
        <div class="sum-money">
            商品总金额:<span>￥{{totalMoney | moneyFilter }}元</span>
        </div>
        <div class="settlement">
            <van-button type="danger" size="small" @click="settleAndClear" plain>结算</van-button>
        </div>
    </div>
</template>

<script>
    import {toMoney}  from '@/filter/moneyFilter.js'
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                cartInfo: [],
                isEmpty: false
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        computed:{
            totalMoney(){
                let allMoney = 0
                this.cartInfo.forEach((item,index)=>{
                allMoney += item.price*item.count
                });
                console.log(this.cartInfo)
                localStorage.cartInfo=JSON.stringify(this.cartInfo)
                return allMoney
            }
        },
        created(){
            this.getCartInfo()
        },
        methods: {
            getCartInfo() {
                if(localStorage.cartInfo){
                    this.cartInfo = JSON.parse(localStorage.cartInfo)
                }
                console.log('this.cartInfo:'+JSON.stringify(this.cartInfo))
                this.isEmpty=this.cartInfo.length>0 ? true:false
            },
            clearCart(){
                localStorage.removeItem('cartInfo')
                this.cartInfo = []
            },
            settleAndClear(){
                localStorage.removeItem('cartInfo')
                this.cartInfo = []
                Toast.success('成功付款')
            }
        },
    }
</script>

<style scoped>
    .cart-title {
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align: right;
    }
    .cart-list{
        background-color: #fff;
    }
    .cart-row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding:0.5rem;
        font-size:0.85rem;
        border-bottom:1px solid #E4E7ED;
    }
    .goods-img {
        flex: 6;
    }
    .goods-text {
        flex: 14;
        padding-left:10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap; 
    }
    .goods-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space:nowrap; 
        margin-bottom: 3rem;
    }
    .goods-price {
        flex: 4;
        text-align: right;
    }
    .counts {
        margin: 1.2rem 0 ;
    }
    .allPrice {
        color: red;
    }
    .sum-money {
        line-height: 2rem;
        text-align: right;
        padding: 5px;
    }
    .sum-money span {
        color: red;
    }
    .settlement {
        height: 2rem;
        line-height: 2rem;
        background-color: #fff;
        border-bottom:1px solid #E4E7ED;
        padding:5px;
        text-align: right;
    }
</style>