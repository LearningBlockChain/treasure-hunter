<template>
  <div>
    <h1>Welcome to Treasure Hunter</h1>
    <div class='metamask-info'>
        <p>Hunter: {{ hunter }}
        <p>Balance: {{ balance }} Wei </p>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'TreasureDapp',
    beforeCreate () {
        console.log('registerWeb3 Action dispatched.')
        this.$store.dispatch('registerWeb3')
    },
    data() {
        return {
        }
    },
    mounted() {
        console.log('dispatching getContractInstance')
        this.$store.dispatch('getContractInstance')
    },
    computed: mapState({
        hunter: state => state.web3.clientAddress,
        balance: state => state.web3.clientBalance,
        // ethBalance: state => {
        //     if (state.web3.web3Instance !== null) return state.web3.web3Instance().fromWei(state.web3.balance, 'ether')
        // }
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