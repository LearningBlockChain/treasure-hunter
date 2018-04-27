<template>
  <div>
    <h1>Investing...</h1>
    <div class='metamask-info'>
        <p>Hunter: {{ hunter }}
        <p>Balance: {{ balance }} Wei </p>
        <p>InvestPrice: {{ investPrice }} Wei </p>
        <b-button variant="success" @click="test">Get Invest Period!</b-button>
        <b-button variant="success" @click="getInvestPrice">Get Invest Price</b-button>
        <b-button variant="success" @click="invest">Invest</b-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'GameInvesting',
    data() {
        return {
            investPrice: 0,
        }
    },
    mounted() {
    },
    computed: mapState({
        hunter: state => state.web3.clientAddress,
        balance: state => state.web3.clientBalance,
        // ethBalance: state => {
        //     if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
        // }
    }),
    methods: {
        test() {
            console.log(this.$store.state.contractInstance)
            let instance = this.$store.state.contractInstance
            instance().getInvestPeriod.call().then(function(result) {
                console.log(parseInt(result, 10))
            })
        },
        getInvestPrice() {
            // this.investPrice = 20;
            let that = this
            let instance = this.$store.state.contractInstance
            instance().getInvestPrice.call().then(function(result) {
                that.investPrice = parseInt(result, 0);
            })
        },
        invest() {
            let instance = this.$store.state.contractInstance
            instance().invest.call({gas: 1000, value: this.investPrice}).then(function(result){
                console.log("result: "+result)
            })
        }
    }
}
</script>

<style scoped>
.metamask-info {
  text-align:center;
}
#has-metamask {
  color: green;
}
#no-metamask {
  color:red;
}</style>