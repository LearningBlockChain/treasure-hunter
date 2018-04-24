<template>
    <div>
        <game-playing :gamePlayingData="gamePlayingData" v-if="isGameStarted"></game-playing>
        <game-investing :gameInvestingData="gameInvestingData" v-if="!isGameStarted"></game-investing>
    </div>
</template>

<script>
    import GameInvesting from '@/components/Game/GameInvesting.vue'
    import GamePlaying from '@/components/Game/GamePlaying.vue'
    export default {
        name: 'Game',
        components: { GameInvesting, GamePlaying },
        beforeCreate () {
            console.log('registerWeb3 Action dispatched.')
            this.$store.dispatch('registerWeb3')
        },
        data() {
            return {
                isGameStarted: false,
                gameInvestingData: {},
                gamePlayingData: {}
            }
        },
        mounted() {
            this.$store.state.contractInstance().getInvestPeriod((err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(result)
                }
            })
        }
    }
</script>

<style>

</style>