<template>
  <div>
    <h1>Welcome to Treasure Hunter</h1>
    <div class='metamask-info'>
        <p v-if="isInjected" id="has-metamask"><i aria-hidden="true" class="fa fa-check"></i> Metamask installed</p>
        <p v-else id="no-metamask"><i aria-hidden="true" class="fa fa-times"></i> </p>
        <p>Network: {{ network }}</p>
        <p>Account: {{ coinbase }}</p>
        <p>Balance: {{ balance }} Wei // {{ ethBalance }} Eth</p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'Treasure-dapp',
    beforeCreate () {
        console.log('registerWeb3 Action dispatched from casino-dapp.vue')
        this.$store.dispatch('registerWeb3')
    },
    data() {
        return {
        }
    },
    mounted() {

    },
    computed: mapState({
        isInjected: state => state.web3.isInjected,
        network: state => NETWORKS[state.web3.networkId],
        coinbase: state => state.web3.coinbase,
        balance: state => state.web3.balance,
        ethBalance: state => {
            if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
        }
    }),
    methods: {

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