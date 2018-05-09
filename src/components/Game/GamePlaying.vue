<template>
    <div>
        <div v-if="isSuccess">
            <b-img
                    class="center"
                    src="https://static.wixstatic.com/media/b8bbf2_13b3b18c917f4f2799965e1608917120~mv2_d_7266_4775_s_4_2.jpg/v1/fill/w_792,h_430,al_c,q_80,usm_0.66_1.00_0.01/b8bbf2_13b3b18c917f4f2799965e1608917120~mv2_d_7266_4775_s_4_2.webp"
                    fluid
            />
            <b-container fluid>
                <b-row class="my-1">
                    <b-button variant="success" @click="restartGame">Restart Game!</b-button>
                </b-row>
            </b-container>
        </div>
        <div v-if="!isSuccess">
            <b-img
                    class="center"
                    src="https://opengameart.org/sites/default/files/chest.png"
                    fluid
            />
            <b-container fluid>
                <b-row class="my-1">
                    <b-col sm="3">
                        <label>Reward:</label>
                    </b-col>
                    <b-col sm="9">
                        {{ (reward / Math.pow(10, 18)).toFixed(6) }} Ether
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="3">
                        <label>Betting-Price(wei):</label>
                    </b-col>
                    <b-col sm="9">
                        {{ (bettingPrice / Math.pow(10, 18)).toFixed(6) }} Ether
                    </b-col>
                </b-row>
                <b-row class="my-1">
                    <b-col sm="3">
                        <label>Guess:</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input type="number" v-model="guess" :state="guess.length === 3" placeholder="What is your lucky numbers?"></b-form-input>
                    </b-col>
                </b-row>
                <b-row class="my-1 put-right">
                    <b-col>
                        <b-button variant="success" @click="bet" :disabled="guess.length !== winningNumberDigits" target>Bet</b-button>
                    </b-col>
                </b-row>
            </b-container>
            <br/><br/><br/>
            <hr/>
            <b-container>
                <h3>Investors</h3>
                <b-list-group v-for="(investor, index) in investors" :key="`${index} + 999999999`">
                    <b-list-group-item variant="primary">{{ investor }}</b-list-group-item>
                </b-list-group>
                <br/>
                <h3>Hunters</h3>
                <b-list-group v-for="(hunter, index) in hunters" :key="`${index}`">
                    <b-list-group-item variant="success">{{ hunter }}</b-list-group-item>
                </b-list-group>
            </b-container>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Toast from '@/util/toast'

export default {
    name: 'GamePlaying',
    data() {
        return {
            isSuccess: false,
            guess: 0
        }
    },
    computed: mapState({
        reward: function() {
            this.$store.dispatch('getReward')
            return this.$store.state.treasure.reward
        },
        bettingPrice: function() {
            this.$store.dispatch('getBettingPrice')
            return this.$store.state.treasure.bettingPrice
        },
        hunters: function() {
            this.$store.dispatch('getHunters')
            return this.$store.state.user.hunters

        },
        investors: function() {
            this.$store.dispatch('getInvestors')
            return this.$store.state.user.investors
        },
        winningNumberDigits() {
            this.$store.dispatch('getWinningNumberDigits')
            return this.$store.state.treasure.winningNumberDigits
        }
    }),
    mounted() {
        let FinishGame = this.$store.state.contractInstance().FinishGame()
        FinishGame.watch((err, result) => {
            if (err) {
                Toast('Something went to Wrong while investing!', 'error')
            } else {
                this.isSuccess = true
            }
        })

        let Bet = this.$store.state.contractInstance().Bet()
        Bet.watch((err, result) => {
            if (err) {
                Toast('Something went to Wrong while investing!', 'error')
            } else {
                if (this.guess.length > 0)
                    Toast('Sorry, you choose wrong number!', 'error')
                this.$store.dispatch('getReward')
                this.$store.dispatch('getBettingPrice')
            }
        })
    },
    methods: {
        bet() {
            this.$store.dispatch('bet', this.guess).then((error, res) => {
            }).catch(e => {
                Toast('Something went to Wrong while betting!', 'error')
                console.log(e)
            })
        },
        restartGame() {
            this.$emit('gameInvest')
        }
    }
}
</script>

<style>
</style>