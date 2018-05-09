<template>
  <div>
    <h1>{{ currentState }}</h1>
    <b-row>
      <b-col sm="6">
        <b-img
                v-if="(totalCollectedInvestmentCosts / minimalInvestmentCosts) >= 0 && (totalCollectedInvestmentCosts / minimalInvestmentCosts) < 0.5"
                class="center"
                src="http://www.dcpracticeinsights.com/content/images/collecting_money__1_1_7876.jpg"
        />
        <b-img
                v-if="(totalCollectedInvestmentCosts / minimalInvestmentCosts) >= 0.5 && (totalCollectedInvestmentCosts / minimalInvestmentCosts) < 1"
                class="center"
                src="https://warriorsway.com/wp-content/uploads/2013/07/youre-almost-there.jpg"
        />
        <b-img
                v-if="(totalCollectedInvestmentCosts / minimalInvestmentCosts) >= 1"
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
              <label>Minimal Investment Costs to start:</label>
            </b-col>
            <b-col>
              {{ (minimalInvestmentCosts / Math.pow(10, 18)).toFixed(6)}} Ether
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
      </b-col>
    </b-row>

    <b-row class="put-right">
      <b-col>
        <b-button variant="outline-success" @click="invest">Investment!</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Toast from '@/util/toast'

export default {
    name: 'GameInvesting',
    data() {
        return {
        }
    },
    computed: mapState({
        totalCollectedInvestmentCosts: function() {
            this.$store.dispatch('getReward')
            return this.$store.state.treasure.reward
        },
        minimalInvestmentCosts: function() {
            this.$store.dispatch('getMinimumWinningReward')
            return this.$store.state.treasure.minimalReward
        },
        investmentCosts: function() {
            this.$store.dispatch('getInvestPrice')
            return this.$store.state.treasure.investPricePerAddress
        },
        currentState: function() {
            this.$store.dispatch('getCurrentState')
            if (this.$store.state.treasure.currentState > 0) {
                this.$emit('gameStart')
                return
            }
            else
                return 'Investing'
        }
    }),
    mounted() {
        let Invest = this.$store.state.contractInstance().Invest()
        Invest.watch((err, result) => {
            if (err) {
                Toast('Something went to Wrong while investing!', 'error')
            } else {
                this.$store.dispatch('getReward')
                this.$store.dispatch('getCurrentState')
            }
        })

        let Game = this.$store.state.contractInstance().StartGame()
        Game.watch((err, result) => {
            if (err) {
                Toast('Something went to Wrong while playing a game!', 'error')
            } else {
                console.log('Game gets started!')
            }
        })
    },
    methods: {
        invest() {
            this.$store.dispatch('invest').then((error, res) => {
                // Nothing to do
            }).catch(e => {
                Toast('Something went to Wrong while investing!', 'error')
                console.log(e)
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