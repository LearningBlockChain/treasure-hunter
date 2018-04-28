<template>
  <div>
    <h1>{{ currentState }}</h1>
    <b-row>
      <b-col sm="6">
        <b-img
                v-if="collectionRate >= 0 && collectionRate < 50"
                class="center"
                src="http://www.dcpracticeinsights.com/content/images/collecting_money__1_1_7876.jpg"
        />
        <b-img
                v-if="collectionRate >= 50 && collectionRate < 80"
                class="center"
                src="https://warriorsway.com/wp-content/uploads/2013/07/youre-almost-there.jpg"
        />
        <b-img
                v-if="collectionRate >= 80"
                class="center"
                src="https://billyjohnson.files.wordpress.com/2010/09/done_r_hi.gif"
        />
      </b-col>
      <b-col sm="6">
        <b-row>
          <b-col>
            <label>Collected Investment Costs:</label>
          </b-col>
          <b-col>
            {{ (totalCollectedInvestmentCosts / Math.pow(10, 18)).toFixed(6) }} Ether
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Investment Costs per person:</label>
          </b-col>
          <b-col>
            {{ (investmentCosts / Math.pow(10, 18)).toFixed(6) }} Ether
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <label>Investment Period:</label>
          </b-col>
          <b-col>
            {{ new Date(1000 * investExpireAt).toLocaleString() }}
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <b-row class="put-right">
      <b-col>
        <b-button variant="outline-success" @click="invest">Investing!</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'GameInvesting',
    data() {
        return {
            collectionRate: 0
        }
    },
    computed: mapState({
        totalCollectedInvestmentCosts: function() {
            this.$store.dispatch('getReward')
            return this.$store.state.treasure.reward
        },
        investmentCosts: function() {
            this.$store.dispatch('getInvestPrice')
            return this.$store.state.treasure.investPricePerAddress
        },
        currentState: function() {
            this.$store.dispatch('getCurrentState')
            return this.$store.state.treasure.currentState === 0 ? 'Investing' : 'Game'
        },
        investExpireAt: function() {
            this.$store.dispatch('getInvestExpireAt')
            return this.$store.state.treasure.investExpireAt
        },
    }),
    mounted() {

    },
    methods: {
        invest() {
            this.$store.dispatch('invest').then((res) => {
                // Nothing to do
            })
            let Invest = this.$store.state.contractInstance().Invest()
            Invest.watch((err, result) => {
                if (err) {
                    console.log('Could not get event Invest()')
                } else {
                    console.log('Watch Invest')
                    console.log(result)
                }
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