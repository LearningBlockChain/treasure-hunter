<template>
  <div>
    <h1>Investing...</h1>
    <div class='metamask-info'>
        <p>Hunter: {{ hunter }}
        <p>Balance: {{ balance }} Wei </p>
        <b-button variant="success" @click="test">Get Invest Period!</b-button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'GameInvesting',
    data() {
        return {
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